import { BaseModelWithId } from '../../../src/db/models/BaseModelWithId.js';
import { ITestDocumentWithId } from '../documents/interfaces/ITestDocumentWithId.js'
import { TypeConverter } from '../../../src/utils/TypeConverter.js'

export class TestWithId extends BaseModelWithId {
    public account: string;
    public ticker: string;
    public amount: bigint;
    public lock: bigint;
    public mint: bigint;
    public stake: bigint;

    constructor(readonly document: ITestDocumentWithId) {
        super(document._id,
            document.version);

        this.account = document.account;
        this.ticker = document.ticker;
        this.amount = TypeConverter.decimal128ToBigint(document.amount);
        this.lock = TypeConverter.decimal128ToBigint(document.lock);
        this.mint = TypeConverter.decimal128ToBigint(document.mint);
        this.stake = TypeConverter.decimal128ToBigint(document.stake);
    }

    public override toDocumentWithId(): Readonly<IBaseDocumentWithId> {
        const document: ITestDocumentWithId = {
            account: this.account,
            ticker: this.ticker,
            amount: TypeConverter.bigintToDecimal128(this.amount),
            lock: TypeConverter.bigintToDecimal128(this.lock),
            mint: TypeConverter.bigintToDecimal128(this.mint),
            stake: TypeConverter.bigintToDecimal128(this.stake),
            version: this.version,
            _id: this._id
        };

        return document;
    }
}
