import { ObjectId } from 'mongodb';
import { DBConstants } from '../DBConstants.js';
import { IBaseDocumentWithId } from '../documents/interfaces/IBaseDocumentWithId.js';
import { BaseModel } from './BaseModel.js';

export abstract class BaseModelWithId extends BaseModel {
    public _id: ObjectId;
    public version: number;

    protected constructor(id?: ObjectId, version?: number) {
        super();
        this._id = id || new ObjectId(DBConstants.NULL_OBJECT_ID);
        this.version = version || 0;
    }

    public abstract toDocumentWithId(): Readonly<IBaseDocumentWithId>;
}
