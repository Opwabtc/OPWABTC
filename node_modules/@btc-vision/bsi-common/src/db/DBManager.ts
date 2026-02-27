import {
    ClientSession,
    ClientSessionOptions,
    Db,
    MongoClient,
    MongoClientOptions,
    ReadPreference,
} from 'mongodb';
import { DataAccessError } from '../errors/DataAccessError.js';
import { DataAccessErrorType } from '../errors/enums/DataAccessErrorType.js';
import { Globals } from '../utils/Globals.js';
import { MongoCredentials, MongoCredentialsDTO } from './credentials/MongoCredentials.js';
import { InnerDBManager } from './interfaces/IDBManager.js';
import { IConfig, IConfigBase } from '../config/interfaces/IConfig';

Globals.register();

// @ts-expect-error - This is a polyfill for BigInt JSON serialization.
BigInt.prototype.toJSON = function () {
    return this.toString();
};

export class ConfigurableDBManager extends InnerDBManager {
    public isConnected: boolean = false;
    public db: Db | null = null;

    private client: MongoClient | undefined;
    private mongo: MongoClient | undefined;
    private isConnecting: boolean = false;
    private databaseName: string = '';
    private connectionUri: string = '';

    private isSetup: boolean = false;
    private connectionPromise: Promise<void> | null = null;

    public constructor(
        config: IConfig<IConfigBase>,
        private readonly mongoOpts: MongoClientOptions = {
            readPreference: ReadPreference.PRIMARY_PREFERRED,
            directConnection: true,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
            appName: `OPNet`,
        },
    ) {
        super(config);
    }

    public createNewMongoClient(): [MongoClient, string] {
        const mongoCredentials = this.#getMongoCredentials();

        return [
            new MongoClient(mongoCredentials.connectionUri, this.mongoOpts),
            mongoCredentials.databaseName,
        ];
    }

    public setup(): boolean {
        if (this.isSetup) return true;
        this.isSetup = true;

        const mongoProductionCredentials = this.#getMongoCredentials();

        this.connectionUri = mongoProductionCredentials.connectionUri;
        this.databaseName = mongoProductionCredentials.databaseName;

        if (!this.mongo) {
            this.mongo = new MongoClient(this.connectionUri, this.mongoOpts);
        }

        return false;
    }

    public async close(): Promise<void> {
        await this.client?.close();
        this.db = null;
        delete this.client;
        this.connectionPromise = null;
        this.isConnected = false;
    }

    public async connect(log: boolean = false): Promise<void> {
        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        if (this.isConnecting) return;
        if (!this.mongo) return;

        this.isConnecting = true;

        this.connectionPromise = new Promise(async (resolve) => {
            this.info('Initializing MongoDB Remote Connection.');
            if (!this.mongo) return this.log('Mongo client is not initialized.');

            this.isConnected = false;

            const client = await this.mongo.connect().catch((err: unknown) => {
                this.error(`Something went wrong while connecting to the database -> ${err}`);

                setTimeout(async () => {
                    this.warn(`Attempting mongo auto reconnection.`);
                    await this.connect();

                    resolve();
                }, 2000);
            });

            if (!client) {
                return;
            }

            if (log) this.success('Connected to the database.');

            this.client = client;
            this.isConnected = true;

            this.db = this.client.db(this.databaseName);

            resolve();
        });

        return this.connectionPromise;
    }

    public startSession(): ClientSession {
        if (!this.client) {
            throw new DataAccessError('Client not connected.', DataAccessErrorType.Unknown, '');
        }

        const sessionConfig: ClientSessionOptions = {
            defaultTransactionOptions: {
                maxCommitTimeMS: 29 * 60000, // max 29 minutes.
                maxTimeMS: 29 * 60000, // max 29 minutes.
            },
        };

        return this.client.startSession(sessionConfig);
    }

    #getMongoCredentials() {
        return new MongoCredentials(<MongoCredentialsDTO>{
            databaseName: this.config.DATABASE.DATABASE_NAME,

            username: this.config.DATABASE.AUTH.USERNAME,
            password: this.config.DATABASE.AUTH.PASSWORD,

            host: this.config.DATABASE.HOST,
            port: this.config.DATABASE.PORT.toString(),
        });
    }
}
