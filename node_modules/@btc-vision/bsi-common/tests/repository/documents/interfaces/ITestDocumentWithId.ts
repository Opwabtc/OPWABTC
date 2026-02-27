import { Decimal128 } from 'mongodb';
import { IBaseDocumentWithId } from '../../../../src/db/documents/interfaces/IBaseDocumentWithId.js';

export interface ITestDocumentWithId extends IBaseDocumentWithId {
    readonly account: string;
    readonly ticker: string;
    readonly amount: Decimal128;
    readonly lock: Decimal128;
    readonly mint: Decimal128;
    readonly stake: Decimal128;
}
