import { Logger } from '@btc-vision/logger';
import {
    AnyBulkWriteOperation,
    BulkWriteOptions,
    BulkWriteResult,
    ClientSession,
    Collection,
    CountDocumentsOptions,
    Db,
    DeleteOptions,
    Filter,
    FindOptions,
    OperationOptions,
    Sort,
    UpdateOptions,
} from 'mongodb';
import { DataAccessError } from '../../errors/DataAccessError.js';
import { DataAccessErrorType } from '../../errors/enums/DataAccessErrorType.js';
import { IBaseDocument } from '../documents/interfaces/IBaseDocument.js';
import { PagingQueryInfo, PagingQueryResult } from './PagingQuery.js';

export abstract class BaseRepository<TDocument extends IBaseDocument> extends Logger {
    protected _db: Db;

    protected constructor(db: Db) {
        super();
        this._db = db;
    }

    public async delete(
        criteria: Partial<Filter<TDocument>>,
        currentSession?: ClientSession,
    ): Promise<number> {
        try {
            const collection = this.getCollection();

            const options: DeleteOptions = this.getOptions(currentSession);

            const result = await collection.deleteMany(criteria, options);

            return result.deletedCount;
        } catch (error) {
            if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    public async getAll(
        criteria?: Partial<Filter<TDocument>>,
        currentSession?: ClientSession,
        sort?: Sort,
    ): Promise<TDocument[]> {
        try {
            const collection = this.getCollection();
            const options: FindOptions = this.getOptions(currentSession);

            options.sort = sort;

            if (criteria) {
                return (await collection.find(criteria, options).toArray()) as TDocument[];
            } else {
                return (await collection.find({}, options).toArray()) as TDocument[];
            }
        } catch (error) {
            if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    public async getCount(
        criteria?: Partial<Filter<TDocument>>,
        currentSession?: ClientSession,
    ): Promise<number> {
        try {
            const collection = this.getCollection();
            const options: CountDocumentsOptions = this.getOptions(currentSession);

            if (criteria) {
                return await collection.countDocuments(criteria, options);
            } else {
                return await collection.countDocuments({}, options);
            }
        } catch (error) {
            if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    public async queryOne(
        criteria: Partial<Filter<TDocument>>,
        currentSession?: ClientSession,
        sort?: Sort,
    ): Promise<TDocument | null> {
        try {
            const collection = this.getCollection();
            const options: FindOptions = this.getOptions(currentSession);

            options.sort = sort;

            return (await collection.findOne(criteria, options)) as TDocument;
        } catch (error) {
            if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    public async queryMany(
        criteria: Partial<Filter<TDocument>>,
        currentSession?: ClientSession,
        sort?: Sort,
    ): Promise<TDocument[]> {
        try {
            const collection = this.getCollection();
            const options: FindOptions = this.getOptions(currentSession);

            options.sort = sort;

            return (await collection.find(criteria, options).toArray()) as TDocument[];
        } catch (error) {
            if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    public async queryManyAndSortPaged(
        criteria: Partial<Filter<TDocument>>,
        sort: Sort,
        pagingQueryInfo: PagingQueryInfo,
        currentSession?: ClientSession,
    ): Promise<PagingQueryResult<TDocument>> {
        try {
            const collection = this.getCollection();
            const skips = pagingQueryInfo.pageSize * (pagingQueryInfo.pageNumber - 1);
            const count: number = await this.getCount(criteria);
            const options: FindOptions = this.getOptions(currentSession);

            const documents = await collection
                .find(criteria, options)
                .sort(sort)
                .skip(skips)
                .limit(pagingQueryInfo.pageSize)
                .toArray();

            return new PagingQueryResult<TDocument>(
                pagingQueryInfo.pageSize,
                pagingQueryInfo.pageNumber,
                count,
                pagingQueryInfo.pageNumber * pagingQueryInfo.pageSize < count,
                documents as TDocument[],
            );
        } catch (error) {
            if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    public async queryManyAndSort(
        criteria: Partial<Filter<TDocument>>,
        sort: Sort,
        currentSession?: ClientSession,
    ): Promise<TDocument[]> {
        try {
            const collection = this.getCollection();
            const options: FindOptions = this.getOptions(currentSession);

            return (await collection.find(criteria, options).sort(sort).toArray()) as TDocument[];
        } catch (error) {
            if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    public async save(
        criteria: Partial<Filter<TDocument>>,
        document: TDocument,
        currentSession?: ClientSession,
    ): Promise<void> {
        try {
            const collection = this.getCollection();
            const options: UpdateOptions = {
                ...this.getOptions(currentSession),
                upsert: true,
            };

            const result = await collection.updateOne(criteria, { $set: document }, options);

            if (!result.acknowledged) {
                throw new DataAccessError(
                    'Concurrency error while updating.',
                    DataAccessErrorType.Concurency,
                    '',
                );
            }
        } catch (error) {
            if (error instanceof DataAccessError) {
                throw error;
            } else if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    public async updatePartial(
        criteria: Partial<Filter<TDocument>>,
        document: Partial<TDocument>,
        currentSession?: ClientSession,
    ): Promise<void> {
        try {
            const collection = this.getCollection();
            const options: UpdateOptions = {
                ...this.getOptions(currentSession),
                upsert: true,
            };

            const updateResult = await collection.updateOne(criteria, { $set: document }, options);

            if (!updateResult.acknowledged) {
                throw new DataAccessError(
                    'Concurrency error while updating.',
                    DataAccessErrorType.Concurency,
                    '',
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    public async bulkWrite(
        operations: AnyBulkWriteOperation<TDocument>[],
        currentSession?: ClientSession,
    ): Promise<void> {
        try {
            const collection = this.getCollection();
            const options: BulkWriteOptions = this.getOptions(currentSession);
            options.ordered = false;

            const result: BulkWriteResult = await collection.bulkWrite(operations, options);

            if (result.hasWriteErrors()) {
                result.getWriteErrors().forEach((error) => {
                    this.error(`Bulk write error: ${error}`);
                });

                throw new DataAccessError('Failed to bulk write.', DataAccessErrorType.Unknown, '');
            }

            if (!result.isOk()) {
                throw new DataAccessError('Failed to bulk write.', DataAccessErrorType.Unknown, '');
            }
        } catch (error) {
            if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    public async updatePartialWithFilter(
        criteria: Partial<Filter<TDocument>>,
        document: Partial<Filter<TDocument>>,
        currentSession?: ClientSession,
    ): Promise<void> {
        try {
            const collection = this.getCollection();
            const options: UpdateOptions = {
                ...this.getOptions(currentSession),
                upsert: true,
            };

            const updateResult = await collection.updateOne(criteria, document, options);

            if (!updateResult.acknowledged) {
                throw new DataAccessError(
                    'Concurrency error while updating.',
                    DataAccessErrorType.Concurency,
                    '',
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                const errorDescription: string = error.stack || error.message;

                throw new DataAccessError(errorDescription, DataAccessErrorType.Unknown, '');
            } else {
                throw error;
            }
        }
    }

    protected abstract getCollection(): Collection<TDocument>;

    protected getOptions(currentSession?: ClientSession): OperationOptions {
        const options: OperationOptions = {};

        if (currentSession) {
            options.session = currentSession;
            options.readPreference = 'primary';
        }

        return options;
    }
}
