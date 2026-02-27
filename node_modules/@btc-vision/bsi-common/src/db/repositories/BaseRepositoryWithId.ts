import {
    ClientSession,
    Db,
    DeleteOptions,
    Filter,
    FindOptions,
    InsertOneOptions,
    ObjectId,
    OptionalUnlessRequiredId,
    UpdateOptions,
} from 'mongodb';
import { DataAccessError } from '../../errors/DataAccessError.js';
import { DataAccessErrorType } from '../../errors/enums/DataAccessErrorType.js';
import { DBConstants } from '../DBConstants.js';
import { IBaseDocumentWithId } from '../documents/interfaces/IBaseDocumentWithId.js';
import { BaseRepository } from './BaseRepository.js';

export abstract class BaseRepositoryWithId<
    TDocument extends IBaseDocumentWithId,
> extends BaseRepository<TDocument> {
    protected constructor(db: Db) {
        super(db);
    }

    public async deleteById(id: ObjectId, currentSession?: ClientSession): Promise<boolean> {
        try {
            const collection = this.getCollection();
            const options: DeleteOptions = this.getOptions(currentSession);

            const filter: Filter<TDocument> = {
                _id: id,
            } as Partial<Filter<TDocument>>;

            const result = await collection.deleteOne(filter, options);

            return result.deletedCount === 1;
        } catch (error) {
            if (error instanceof Error) {
                throw new DataAccessError(
                    error.message,
                    DataAccessErrorType.Unknown,
                    `id: ${id.toString()}`,
                );
            } else {
                throw error;
            }
        }
    }

    public async deleteDocumentById(
        document: TDocument,
        session?: ClientSession,
    ): Promise<boolean> {
        return await this.deleteById(document._id, session);
    }

    public async getById(id: ObjectId, currentSession?: ClientSession): Promise<TDocument | null> {
        try {
            const collection = this.getCollection();
            const options: FindOptions = this.getOptions(currentSession);
            const filter: Partial<Filter<TDocument>> = {
                _id: id,
            } as Partial<Filter<TDocument>>;

            return (await collection.findOne(filter, options)) as TDocument | null;
        } catch (error) {
            if (error instanceof Error) {
                throw new DataAccessError(
                    error.message,
                    DataAccessErrorType.Unknown,
                    `id: ${id.toString()}`,
                );
            } else {
                throw error;
            }
        }
    }

    public async saveById(document: TDocument, currentSession?: ClientSession): Promise<void> {
        try {
            const collection = this.getCollection();
            const currentVersion = document.version;
            document.version = document.version + 1;

            const filter: Partial<Filter<TDocument>> = {
                _id: document._id,
                version: currentVersion,
            } as Partial<Filter<TDocument>>;

            const { _id, ...updateData } = document;

            if (_id.toString() !== DBConstants.NULL_OBJECT_ID) {
                const options: UpdateOptions = this.getOptions(currentSession);

                const result = await collection.updateOne(
                    filter,
                    { $set: updateData as Partial<TDocument> },
                    options,
                );

                if (result.modifiedCount === 0) {
                    throw new DataAccessError(
                        'Concurency error while updating.',
                        DataAccessErrorType.Concurency,
                        `id ${document._id}, version: ${currentVersion}`,
                    );
                }
            } else {
                const options: InsertOneOptions = this.getOptions(currentSession);

                document._id = new ObjectId();
                await collection.insertOne(
                    document as OptionalUnlessRequiredId<TDocument>,
                    options,
                );
            }
        } catch (error) {
            if (error instanceof DataAccessError) {
                throw error;
            } else if (error instanceof Error) {
                throw new DataAccessError(error.message);
            } else {
                throw error;
            }
        }
    }

    public async updatePartialById(
        id: ObjectId,
        version: number,
        document: Partial<TDocument>,
        currentSession?: ClientSession,
    ): Promise<void> {
        try {
            const collection = this.getCollection();
            document.version = version + 1;

            const filter: Partial<Filter<TDocument>> = {
                _id: id,
                version: version,
            } as Partial<Filter<TDocument>>;

            const options: UpdateOptions = this.getOptions(currentSession);

            const updateResult = await collection.updateOne(filter, { $set: document }, options);

            if (updateResult.modifiedCount !== 1) {
                throw new DataAccessError(
                    'Concurency error while updating.',
                    DataAccessErrorType.Concurency,
                    `id ${id}, version: ${version}`,
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new DataAccessError(
                    error.message,
                    DataAccessErrorType.Unknown,
                    `id: ${id.toString()}`,
                );
            } else {
                throw error;
            }
        }
    }
}
