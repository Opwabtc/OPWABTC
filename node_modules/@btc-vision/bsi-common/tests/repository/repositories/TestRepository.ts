import { Collection, Db, Document } from 'mongodb';
import { BaseRepository } from '../../../src/db/repositories/BaseRepository.js';
import { ITestDocument } from '../documents/interfaces/ITestDocument.js';

export class TestRepository extends BaseRepository<ITestDocument> {
    public moduleName: string = 'TestRepository';
    public logColor: string = '#afeeee';

    constructor(db: Db) {
        super(db);
    }

    protected override getCollection(): Collection<ITestDocument> {
        return this._db.collection('Tests');
    }
}
