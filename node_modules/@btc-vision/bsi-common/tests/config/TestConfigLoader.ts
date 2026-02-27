import { IConfigBase } from '../../src/config/interfaces/IConfig.js';
import { ConfigManager, } from '../../src/config/ConfigLoader.js';
import { TestConfig } from './TestConfig';

export class TestConfigLoader extends ConfigManager<IConfigBase>{
    constructor(fullFileName: string) {
        super(fullFileName);
    }

    public getConfigs(): TestConfig {
        return new TestConfig(this.config);
    }
}