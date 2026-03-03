import { Blockchain } from '@btc-vision/btc-runtime/runtime';
import { revertOnError } from '@btc-vision/btc-runtime/runtime/abort/abort';
import { USDOP } from './USDOP';

// DO NOT TOUCH THIS.
Blockchain.contract = () => {
    return new USDOP();
};

// VERY IMPORTANT
export * from '@btc-vision/btc-runtime/runtime/exports';

// VERY IMPORTANT
export function abort(message: string, fileName: string, line: u32, column: u32): void {
    revertOnError(message, fileName, line, column);
}
