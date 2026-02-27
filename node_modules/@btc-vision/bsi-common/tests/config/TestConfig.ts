import { IConfigBase } from '../../src/config/interfaces/IConfig.js';
import { ConfigBase, } from '../../src/config/ConfigBase.js';
import { IConfig } from '../../src/config/interfaces/IConfig.js';

export class TestConfig extends ConfigBase<IConfigBase>{
    constructor(config: IConfig<IConfigBase>) {
        super(config);
    }
}