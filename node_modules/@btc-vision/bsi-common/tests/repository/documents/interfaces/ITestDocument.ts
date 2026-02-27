import { Decimal128 } from 'mongodb';
import { IBaseDocument } from '../../../../src/db/documents/interfaces/IBaseDocument.js';

export interface ITestDocument extends IBaseDocument {
    readonly account: string;
    readonly ticker: string;
    readonly amount: Decimal128;
    readonly lock: Decimal128;
    readonly mint: Decimal128;
    readonly stake: Decimal128;
}
