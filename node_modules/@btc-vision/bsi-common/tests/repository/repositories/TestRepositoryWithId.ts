import { Collection, Db, Document } from 'mongodb';
import { BaseRepositoryWithId } from '../../../src/db/repositories/BaseRepositoryWithId.js';
import { ITestDocumentWithId } from '../documents/interfaces/ITestDocumentWithId.js';

export class TestRepositoryWithId extends BaseRepositoryWithId<ITestDocumentWithId> {
    public moduleName: string = 'TestRepositoryWithId';
    public logColor: string = '#afeeee';

    constructor(db: Db) {
        super(db);
    }

    protected override getCollection(): Collection<ITestDocumentWithId> {
        return this._db.collection('TestsWithId');
    }
}
