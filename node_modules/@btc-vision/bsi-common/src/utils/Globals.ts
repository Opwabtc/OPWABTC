// @ts-expect-error - This is a polyfill for BigInt JSON serialization.
BigInt.prototype.toJSON = function () {
    return this.toString();
};

global.BigInt = BigInt;

export class Globals {
    public static register(): void {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        process.on('uncaughtException', (err: Error) => {
            if (!err.stack) return;
            if (err.stack.includes('invalid address')) return;
            if (err.stack.includes('null: value out of range')) return;
            //if(err.stack.includes('invalid request')) return;
            console.log('Thread Caught exception: ', err.stack);
        });

        process.emitWarning = (warning: string, ...args: unknown[]) => {
            if (typeof args[0] === 'string' && args[0] === 'ExperimentalWarning') {
                return;
            }

            if (
                typeof args[0] === 'object' &&
                args[0] !== null &&
                (args[0] as { type?: string }).type === 'ExperimentalWarning'
            ) {
                return;
            } else {
                console.log(warning);
            }

            //return emitWarning(warning, ...args);
        };
    }
}
