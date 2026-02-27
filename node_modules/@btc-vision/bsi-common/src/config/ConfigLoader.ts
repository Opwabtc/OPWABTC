import { DebugLevel, Logger } from '@btc-vision/logger';
import fs from 'fs';
import toml from 'toml';
import '../utils/Globals.js';
import { ConfigBase } from './ConfigBase.js';
import { IConfig, IConfigBase, IConfigTemplate } from './interfaces/IConfig.js';

export abstract class ConfigManager<T extends IConfigTemplate> extends Logger {
    public readonly logColor: string = '#c71585';

    protected config: IConfig<T> = this.getDefaultConfig();

    protected constructor(fullFileName: string, preload: boolean = true) {
        super();

        if (preload) this.loadConfig(fullFileName);
    }

    public abstract getConfigs(): ConfigBase<T>;

    protected getDefaultConfig(): IConfig<T> {
        const config: IConfigBase = {
            DEBUG_LEVEL: DebugLevel.INFO,
            LOG_FOLDER: '',

            DATABASE: {
                DATABASE_NAME: '',
                HOST: '',
                PORT: 0,

                AUTH: {
                    USERNAME: '',
                    PASSWORD: '',
                },
            },
        };

        return config as IConfig<T>;
    }

    protected verifyConfig(parsedConfig: Partial<IConfig<T>>): void {
        if (parsedConfig.DEBUG_LEVEL) {
            if (typeof parsedConfig.DEBUG_LEVEL !== 'number') {
                throw new Error(`Oops the property DEBUG_LEVEL is not a number.`);
            }
        }

        if (parsedConfig.LOG_FOLDER) {
            if (typeof parsedConfig.LOG_FOLDER !== 'string') {
                throw new Error(`Oops the property LOG_FOLDER is not a string.`);
            }
        }

        if (parsedConfig.DATABASE) {
            if (typeof parsedConfig.DATABASE.DATABASE_NAME !== 'string') {
                throw new Error(`Oops the property DATABASE.DATABASE_NAME is not a string.`);
            }

            if (typeof parsedConfig.DATABASE.HOST !== 'string') {
                throw new Error(`Oops the property DATABASE.HOST is not a string.`);
            }

            if (typeof parsedConfig.DATABASE.PORT !== 'number') {
                throw new Error(`Oops the property DATABASE.PORT is not a number.`);
            }

            if (parsedConfig.DATABASE.AUTH) {
                if (typeof parsedConfig.DATABASE.AUTH.USERNAME !== 'string') {
                    throw new Error(`Oops the property DATABASE.AUTH.USERNAME is not a string.`);
                }

                if (typeof parsedConfig.DATABASE.AUTH.PASSWORD !== 'string') {
                    throw new Error(`Oops the property DATABASE.AUTH.PASSWORD is not a string.`);
                }
            }
        }
    }

    protected parsePartialConfig(parsedConfig: Partial<IConfig<T>>): void {
        this.verifyConfig(parsedConfig);

        this.config.DATABASE = {
            ...this.config.DATABASE,
            ...parsedConfig.DATABASE,
        };

        this.config.DEBUG_LEVEL = parsedConfig.DEBUG_LEVEL || this.config.DEBUG_LEVEL;
        this.config.LOG_FOLDER = parsedConfig.LOG_FOLDER || this.config.LOG_FOLDER;
    }

    protected loadConfig(fullFileName: string): void {
        const config: string = fs.readFileSync(fullFileName, 'utf-8');

        if (!config) {
            throw new Error(
                'Failed to load config file. Please ensure that the config file exists.',
            );
        }

        try {
            const parsedConfig: Partial<IConfig<T>> = toml.parse(config) as Partial<IConfig<T>>;

            this.parsePartialConfig(parsedConfig);
        } catch (e: unknown) {
            const error: Error = e as Error;

            this.error(`Failed to load config file. {Details: ${error.stack}}`);
        }
    }
}
