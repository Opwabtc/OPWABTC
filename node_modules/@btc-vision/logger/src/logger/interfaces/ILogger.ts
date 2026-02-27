export interface ILogger {
    readonly moduleName: string;
    readonly logColor: string;

    log(...args: unknown[]): void;

    error(...args: unknown[]): void;

    warn(...args: unknown[]): void;

    debug(...args: unknown[]): void;

    success(...args: unknown[]): void;

    debugBright(...args: unknown[]): void;

    important(...args: unknown[]): void;
}
