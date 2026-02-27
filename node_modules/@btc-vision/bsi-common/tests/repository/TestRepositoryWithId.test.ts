import 'jest';
import { TestRepositoryWithId } from './repositories/TestRepositoryWithId.js';
import { Filter, ObjectId } from 'mongodb';
import { ConfigurableDBManager } from '../../src/db/DBManager.js';
import { ITestDocumentWithId } from './documents/interfaces/ITestDocumentWithId.js';
import { TypeConverter } from '../../src/utils/TypeConverter.js';
import { DataAccessError } from '../../src/errors/DataAccessError.js';
import { DBTestHelper } from '../utils/DBTestHelper.js';
import { DBConstants } from '../../src/db/DBConstants.js';
import { Config } from '../config/Config.js';

describe('TestRepositoryWithId Integration Tests', () => {
    const DBManagerInstance = new ConfigurableDBManager(Config);

    beforeAll(async () => {
        //await DBManagerInstance.setup(Config.DATABASE.CONNECTION_TYPE);
        await DBManagerInstance.connect();
        await DBTestHelper.setupDatabaseForTests(
            DBManagerInstance.db!,
            `${__dirname}/data/`,
            'TestsWithId',
        );
        process.env = {
            TEST_JS: '1',
        };
    }, 20000);

    afterAll(async () => {
        await DBManagerInstance.close();
    });

    describe('deleteById method tests', () => {
        test('deleteById should return true when document to delete is deleted', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);

            const result = await repo.deleteById(new ObjectId('6605d14603bce86bdca515b2'));

            expect(result).toBe(true);
        });

        test('deleteById should return false when document to delete does not exist or was not deleted', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);

            const result = await repo.deleteById(new ObjectId('000000000000000000000000'));

            expect(result).toBe(false);
        });
    });

    describe('getAll method tests', () => {
        test('getAll should return all documents matching id criteria', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocumentWithId>> = {
                _id: {
                    $in: [
                        new ObjectId('65ff1f6c0e0dd5a32089fc22'),
                        new ObjectId('65ff1f6c0e0dd5a32089fc25'),
                        new ObjectId('000000000000000000000000'),
                    ],
                },
            };

            const documents = await repo.getAll(criteria);

            expect(documents.length).toBe(2);
        });
    });

    describe('getById method tests', () => {
        test('getById should return a document when id is found', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);

            const document = await repo.getById(new ObjectId('65ff1f6c0e0dd5a32089fc28'));

            expect(document).toBeDefined();
            expect(document).not.toBeNull();
            expect(document?._id.toString()).toBe('65ff1f6c0e0dd5a32089fc28');
        });

        test('getById should return null when id is not found', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);

            const document = await repo.getById(new ObjectId('000000000000000000000000'));

            expect(document).toBeNull();
        });
    });

    describe('saveById method tests', () => {
        test('saveById a new document, should upsert the document', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);

            const initialVersion = 0;
            const document: ITestDocumentWithId = {
                _id: new ObjectId(DBConstants.NULL_OBJECT_ID),
                version: initialVersion,
                account: '9999',
                amount: TypeConverter.numberToDecimal128(8888),
                lock: TypeConverter.numberToDecimal128(0),
                mint: TypeConverter.numberToDecimal128(0),
                stake: TypeConverter.numberToDecimal128(0),
                ticker: 'TCK1',
            } as ITestDocumentWithId;

            await repo.saveById(document);

            const savedDocument = await repo.getById(document._id);

            expect(savedDocument).toBeDefined();
            expect(savedDocument).not.toBeNull();
            expect(savedDocument?.version).toBe(initialVersion + 1);
        });

        test('save an existing document, should update the document', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);
            let document = await repo.getById(new ObjectId('65ff1f6c0e0dd5a32089fc28'));

            expect(document).not.toBeNull();

            if (document !== null) {
                const currentVersion = document.version;
                const updateDocument: ITestDocumentWithId = {
                    account: document.account,
                    amount: document.amount,
                    lock: TypeConverter.numberToDecimal128(999),
                    mint: document.mint,
                    stake: document.stake,
                    ticker: document.ticker,
                    version: document.version,
                    _id: document._id,
                } as ITestDocumentWithId;

                await repo.saveById(updateDocument);

                expect(updateDocument.version).toBe(currentVersion + 1);

                let document2 = await repo.getById(new ObjectId('65ff1f6c0e0dd5a32089fc28'));

                expect(document2).not.toBeNull();

                if (document2 !== null) {
                    expect(document2.version).toBe(currentVersion + 1);
                    expect(document2.lock.toString()).toBe(
                        TypeConverter.numberToDecimal128(999).toString(),
                    );
                }
            }
        });

        test('save an existing document with an outdated version, should throw concurency error', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);
            let document = await repo.getById(new ObjectId('65ff1f6c0e0dd5a32089fc28'));

            expect(document).not.toBeNull();

            if (document !== null) {
                const updateDocument: ITestDocumentWithId = {
                    account: document.account,
                    amount: document.amount,
                    lock: TypeConverter.numberToDecimal128(999),
                    mint: document.mint,
                    stake: document.stake,
                    ticker: document.ticker,
                    version: 1,
                    _id: document._id,
                } as ITestDocumentWithId;

                await expect(repo.saveById(updateDocument)).rejects.toThrow(DataAccessError);
            }
        });
    });

    describe('updatePartialById method tests', () => {
        test('updatePartialById an existing document, should increment version and update the document', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);
            let document = await repo.getById(new ObjectId('65ff1f6c0e0dd5a32089fc28'));

            expect(document).not.toBeNull();

            if (document !== null) {
                const currentVersion = document.version;
                const updateDocument: Partial<ITestDocumentWithId> = {
                    mint: TypeConverter.numberToDecimal128(3333),
                    stake: TypeConverter.numberToDecimal128(4444),
                };

                await repo.updatePartialById(document._id, currentVersion, updateDocument);

                expect(updateDocument.version).toBe(currentVersion + 1);

                let document2 = await repo.getById(new ObjectId('65ff1f6c0e0dd5a32089fc28'));

                expect(document2).not.toBeNull();

                if (document2 !== null) {
                    expect(document2.version).toBe(currentVersion + 1);
                    expect(document2.mint.toString()).toBe(
                        TypeConverter.numberToDecimal128(3333).toString(),
                    );
                    expect(document2.stake.toString()).toBe(
                        TypeConverter.numberToDecimal128(4444).toString(),
                    );
                }
            }
        });

        test('updatePartialById an existing document with a non existing id, should throw concurency error', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);

            const updateDocument: Partial<ITestDocumentWithId> = {
                mint: TypeConverter.numberToDecimal128(3333),
                stake: TypeConverter.numberToDecimal128(4444),
            };

            await expect(repo.updatePartialById(new ObjectId(), 0, updateDocument)).rejects.toThrow(
                DataAccessError,
            );
        });

        test('updatePartialById an existing document with an outdated version, should throw concurency error', async () => {
            const repo = new TestRepositoryWithId(DBManagerInstance.db!);
            let document = await repo.getById(new ObjectId('65ff1f6c0e0dd5a32089fc28'));

            expect(document).not.toBeNull();

            if (document !== null) {
                const updateDocument: Partial<ITestDocumentWithId> = {
                    mint: TypeConverter.numberToDecimal128(3333),
                    stake: TypeConverter.numberToDecimal128(4444),
                };

                await expect(
                    repo.updatePartialById(document._id, 0, updateDocument),
                ).rejects.toThrow(DataAccessError);
            }
        });
    });
});
