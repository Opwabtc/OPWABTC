import { Decimal128 } from 'mongodb';

export class DataConverter {
    public static fromDecimal128(value: Decimal128): bigint {
        return BigInt(value.toString());
    }

    public static toDecimal128(value: bigint): Decimal128 {
        return Decimal128.fromString(value.toString());
    }
}
