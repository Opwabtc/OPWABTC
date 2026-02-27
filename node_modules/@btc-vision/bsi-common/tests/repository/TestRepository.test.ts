import 'jest';
import { TestRepository } from './repositories/TestRepository.js'
import { Filter, Sort } from 'mongodb';
import { ConfigurableDBManager } from '../../src/db/DBManager.js';
import { ITestDocument } from './documents/interfaces/ITestDocument.js';
import { TypeConverter } from '../../src/utils/TypeConverter.js';
import { DataAccessError } from '../../src/errors/DataAccessError.js';
import { PagingQueryInfo } from '../../src/db/repositories/PagingQuery.js';
import { DBTestHelper } from '../utils/DBTestHelper.js';
import { Config } from '../config/Config.js';

describe('TestRepository Integration Tests', () => {
    const DBManagerInstance = new ConfigurableDBManager(Config);

    beforeAll(async () => {
        await DBManagerInstance.setup();
        await DBManagerInstance.connect();
        await DBTestHelper.setupDatabaseForTests(DBManagerInstance.db!,
            `${__dirname}/data/`,
            'Tests');
        process.env = {
            TEST_JS: '1'
        };
    }, 20000);

    afterAll(async () => {
        await DBManagerInstance.close();
    });

    describe('delete method tests', () => {
        test('delete should return true when document to delete is deleted', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);
            const criteria: Partial<Filter<ITestDocument>> = {
                account: "123",
                ticker: "SOL"
            };

            const result = await repo.delete(criteria);

            expect(result).toBe(1);
        });

        test('delete should return false when document to delete does not exist or was not deleted', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);
            const criteria: Partial<Filter<ITestDocument>> = {
                account: "00000",
                ticker: "ABC"
            };

            const result = await repo.delete(criteria);

            expect(result).toBe(0);
        });
    });

    describe('getAll method tests', () => {
        test('getAll should return all documents when no criteria', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const documents = await repo.getAll();

            expect(documents.length).toBe(5);
        });

        test('getAll should return all documents matching single criteria', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);
            const criteria: Partial<Filter<ITestDocument>> = {
                ticker: 'BTC'
            };

            const documents = await repo.getAll(criteria);

            expect(documents.length).toBe(3);
        });

        test('getAll should return all documents matching multiple criterias', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocument>> = {
                ticker: 'BTC',
                amount: { $gt: TypeConverter.numberToDecimal128(1000) }
            };

            const documents = await repo.getAll(criteria);

            expect(documents.length).toBe(1);
        });
    });

    describe('getCount method tests', () => {
        test('getCount should return total number of document in collection when no criteria', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const count = await repo.getCount();

            expect(count).toBe(5);
        });

        test('getCount should return total number of document in collection matching criteria when criteria is specified', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocument>> = {
                ticker: 'BTC'
            };

            const count = await repo.getCount(criteria);

            expect(count).toBe(3);
        });
    });

    describe('queryOne method tests', () => {
        test('queryOne should return the first document matching the criteria', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocument>> = {
                $and: [
                    { ticker: 'BTC' },
                    { account: '456'}
                ]
            };

            const document = await repo.queryOne(criteria);

            expect(document).toBeDefined();
            expect(document).not.toBeNull();
            expect(document!.account).toBe('456');
            expect(document!.ticker).toBe('BTC');
        });

        test('queryOne should return null when no criteria match', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocument>> = {
                $and: [
                    { ticker: 'ABC' },
                    { account: '000' }
                ]
            };

            const document = await repo.queryOne(criteria);

            expect(document).toBeNull();
        });
    });

    describe('queryMany method tests', () => {
        test('queryMany should return the documents matching the criteria', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocument>> = {
                $or: [
                    { ticker: 'BTC' },
                    { account: '123' }
                ]
            };

            const documents = await repo.queryMany(criteria) as ITestDocument[];

            expect(documents).toBeDefined();
            expect(documents).not.toBeNull();
            expect(documents.length).toBe(4);
            expect(documents[0].account).toBe('123');
            expect(documents[0].ticker).toBe('BTC');
            expect(documents[1].account).toBe('456');
            expect(documents[1].ticker).toBe('BTC');
            expect(documents[2].account).toBe('789');
            expect(documents[2].ticker).toBe('BTC');
            expect(documents[3].account).toBe('123');
            expect(documents[3].ticker).toBe('ETH');
        });

        test('queryMany should return empty when no criteria match', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocument>> = {
                $or: [
                    { ticker: 'ABC' },
                    { account: '000' }
                ]
            };

            const documents = await repo.queryMany(criteria);

            expect(documents.length).toBe(0);
        });
    });

    describe('queryManyAndSortPaged method tests', () => {
        test('queryManyAndSortPaged with 2 pages should return the paged documents matching the criteria, sort and paging info', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocument>> = {
                ticker: 'BTC'
            };

            const sort: Sort = {
                account: 1,
                amount: -1,
            };

            const pagingInfo: PagingQueryInfo = {
                pageNumber: 1,
                pageSize: 2
            };

            const pagingInfo2: PagingQueryInfo = {
                pageNumber: 2,
                pageSize: 2
            };

            const pagingResult = await repo.queryManyAndSortPaged(criteria,
                sort,
                pagingInfo);

            expect(pagingResult.count).toBe(3);
            expect(pagingResult.pageNumber).toBe(1);
            expect(pagingResult.hasMoreResults).toBe(true);
            expect(pagingResult.results.length).toBe(2);
            expect(pagingResult.results[0].account).toBe('123');
            expect(pagingResult.results[1].account).toBe('456');

            const pagingResult2 = await repo.queryManyAndSortPaged(criteria,
                sort,
                pagingInfo2);

            expect(pagingResult2.count).toBe(3);
            expect(pagingResult2.pageNumber).toBe(2);
            expect(pagingResult2.results.length).toBe(1);
            expect(pagingResult2.hasMoreResults).toBe(false);
            expect(pagingResult2.results[0].account).toBe('789');
        });

        test('queryManyAndSortPaged with no result should return no result in the paged result', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocument>> = {
                $or: [
                    { ticker: 'ABC' },
                    { account: '000' }
                ]
            };

            const sort: Sort = {
                account: 1,
                amount: -1,
            };

            const pagingInfo: PagingQueryInfo = {
                pageNumber: 1,
                pageSize: 2
            };

            const pagingResult = await repo.queryManyAndSortPaged(criteria,
                sort,
                pagingInfo);

            expect(pagingResult.count).toBe(0);
            expect(pagingResult.pageNumber).toBe(1);
            expect(pagingResult.hasMoreResults).toBe(false);
            expect(pagingResult.results.length).toBe(0);
        });
    });

    describe('queryManyAndSort method tests', () => {
        test('queryManyAndSort should return the documents matching the criteria and sort', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocument>> = {
                ticker: 'BTC'
            };

            const sort: Sort = {
                account: 1,
                amount: -1,
            };

            const documents = await repo.queryManyAndSort(criteria,
                sort);

            expect(documents.length).toBe(3);
            expect(documents[0].account).toBe('123');
            expect(documents[1].account).toBe('456');
            expect(documents[2].account).toBe('789');
        });

        test('queryManyAndSort should return no documents when no matching the criteria', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const criteria: Partial<Filter<ITestDocument>> = {
                $or: [
                    { ticker: 'ABC' },
                    { account: '000' }
                ]
            };

            const sort: Sort = {
                account: 1,
                amount: -1,
            };

            const documents = await repo.queryManyAndSort(criteria,
                sort);

            expect(documents.length).toBe(0);
        });
    });

    describe('save method tests', () => {
        test('save a new document, should upsert the document', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);

            const document: ITestDocument = {
                account: '9999',
                amount: TypeConverter.numberToDecimal128(8888),
                lock: TypeConverter.numberToDecimal128(0),
                mint: TypeConverter.numberToDecimal128(0),
                stake: TypeConverter.numberToDecimal128(0),
                ticker: 'TCK1'
            } as ITestDocument;

            const criteria: Partial<Filter<ITestDocument>> = {
                account: '9999',
                ticker: 'TCK1'
            };

            await repo.save(criteria,
                document);

            const savedDocument = await repo.queryOne(criteria);

            expect(savedDocument).toBeDefined();
            expect(savedDocument).not.toBeNull();
        });

        test('save an existing document, should update the document', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);
            const criteria: Partial<Filter<ITestDocument>> = {
                account: '789',
                ticker: 'BTC'
            };

            let document = await repo.queryOne(criteria);

            expect(document).not.toBeNull();

            if (document !== null) {
                const updateDocument: ITestDocument = {
                    account: document.account,
                    amount: document.amount,
                    lock: TypeConverter.numberToDecimal128(999),
                    mint: document.mint,
                    stake: document.stake,
                    ticker: document.ticker
                } as ITestDocument;

                await repo.save(criteria,
                    updateDocument);

                let document2 = await repo.queryOne(criteria);

                expect(document2).not.toBeNull();

                if (document2 !== null) {
                    expect(document2.lock.toString()).toBe(TypeConverter.numberToDecimal128(999).toString());
                }
            }
        });
    });

    describe('updatePartial method tests', () => {
        test('updatePartial an existing document, should update the document', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);
            const criteria: Partial<Filter<ITestDocument>> = {
                account: '789',
                ticker: 'BTC'
            };

            let document = await repo.queryOne(criteria);

            expect(document).not.toBeNull();

            if (document !== null) {
                const updateDocument: Partial<ITestDocument> = {
                    mint: TypeConverter.numberToDecimal128(3333),
                    stake: TypeConverter.numberToDecimal128(4444),
                };

                await repo.updatePartial(criteria,
                    updateDocument);

                let document2 = await repo.queryOne(criteria);

                expect(document2).not.toBeNull();

                if (document2 !== null) {
                    expect(document2.mint.toString()).toBe(TypeConverter.numberToDecimal128(3333).toString());
                    expect(document2.stake.toString()).toBe(TypeConverter.numberToDecimal128(4444).toString());
                }
            }
        });

        test('updatePartial an existing document with a non existing document, should throw concurency error', async () => {
            const repo = new TestRepository(DBManagerInstance.db!);
            const criteria: Partial<Filter<ITestDocument>> = {
                account: '0000',
                ticker: 'ABC'
            };

            const updateDocument: Partial<ITestDocument> = {
                mint: TypeConverter.numberToDecimal128(3333),
                stake: TypeConverter.numberToDecimal128(4444),
            };

            await expect(repo.updatePartial(criteria,
                updateDocument)).rejects.toThrow(DataAccessError);
        });
    });

    describe('custom db connection tests', () => {
        test('delete should not delete the document if rollback is called', async () => {
            const [mongoClient, databaseName] = DBManagerInstance.createNewMongoClient();

            try {
                await mongoClient.connect();

                const session = mongoClient.startSession();

                try {
                    const db = mongoClient.db(databaseName);

                    session.startTransaction();

                    const repo = new TestRepository(db);
                    const repo2 = new TestRepository(DBManagerInstance.db!);
                    const criteria: Partial<Filter<ITestDocument>> = {
                        account: '789',
                        ticker: 'BTC'
                    };

                    const result = await repo.delete(criteria,
                        session);

                    expect(result).toBe(1);

                    await session.abortTransaction();

                    const document = await repo2.queryOne(criteria);

                    expect(document).toBeDefined();
                    expect(document).not.toBeNull();
                } finally {
                    session.endSession();
                }
            } finally {
                mongoClient.close();
            }
        });

        test('delete should delete the document if commit is called', async () => {
            const [mongoClient, databaseName] = DBManagerInstance.createNewMongoClient();

            try {
                await mongoClient.connect();

                const session = mongoClient.startSession();

                try {
                    const db = mongoClient.db(databaseName);

                    session.startTransaction();

                    const repo = new TestRepository(db);
                    const repo2 = new TestRepository(DBManagerInstance.db!);
                    const criteria: Partial<Filter<ITestDocument>> = {
                        account: '789',
                        ticker: 'BTC'
                    };

                    const result = await repo.delete(criteria,
                        session);

                    expect(result).toBe(1);

                    await session.commitTransaction();

                    const document = await repo2.queryOne(criteria);

                    expect(document).toBeNull();
                } finally {
                    session.endSession();
                }
            } finally {
                mongoClient.close();
            }
        });
    });
});

