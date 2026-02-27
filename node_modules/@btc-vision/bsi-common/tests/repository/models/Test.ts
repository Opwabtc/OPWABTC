import { BaseModel } from '../../../src/db/models/BaseModel.js';
import { ITestDocument } from '../documents/interfaces/ITestDocument.js'
import { TypeConverter } from '../../../src/utils/TypeConverter.js'

export class Test extends BaseModel {
    public account: string;
    public ticker: string;
    public amount: bigint;
    public lock: bigint;
    public mint: bigint;
    public stake: bigint;

    constructor(readonly document: ITestDocument) {
        super();

        this.account = document.account;
        this.ticker = document.ticker;
        this.amount = TypeConverter.decimal128ToBigint(document.amount);
        this.lock = TypeConverter.decimal128ToBigint(document.lock);
        this.mint = TypeConverter.decimal128ToBigint(document.mint);
        this.stake = TypeConverter.decimal128ToBigint(document.stake);
    }

    public override toDocument(): Readonly<ITestDocument> {
        const document: ITestDocument = {
            account: this.account,
            ticker: this.ticker,
            amount: TypeConverter.bigintToDecimal128(this.amount),
            lock: TypeConverter.bigintToDecimal128(this.lock),
            mint: TypeConverter.bigintToDecimal128(this.mint),
            stake: TypeConverter.bigintToDecimal128(this.stake),
        };

        return document;
    }
}
