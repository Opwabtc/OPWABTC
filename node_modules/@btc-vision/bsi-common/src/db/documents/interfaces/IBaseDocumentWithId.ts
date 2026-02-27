import { WithId } from 'mongodb';
import { IBaseDocument } from './IBaseDocument.js';

export interface IBaseDocumentWithId extends WithId<IBaseDocument> {
    version: number;
}
