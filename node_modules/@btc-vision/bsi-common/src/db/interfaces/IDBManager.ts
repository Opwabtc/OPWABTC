import { Logger } from '@btc-vision/logger';
import { ClientSession } from 'mongodb';
import { IConfig, IConfigBase } from '../../config/interfaces/IConfig.js';

export interface IDBManager {
    connect: () => Promise<void>;
    setup: (targetDatabase: string) => boolean;
    close: () => Promise<void>;
    startSession: () => ClientSession;
}

export abstract class InnerDBManager extends Logger implements IDBManager {
    protected config: IConfig<IConfigBase>;

    protected constructor(config: IConfig<IConfigBase>) {
        super();
        this.config = config;
    }

    public abstract connect(): Promise<void>;

    public abstract setup(targetDatabase: string): boolean;

    public abstract close(): Promise<void>;

    public abstract startSession(): ClientSession;
}
