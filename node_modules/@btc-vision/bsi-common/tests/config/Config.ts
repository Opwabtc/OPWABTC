import { TestConfigLoader } from './TestConfigLoader.js';
import { TestConfig } from './TestConfig.js';
import path from 'path';

const configPath = path.join(__dirname, '../../', 'tests/config/opnet.unit.test.conf');

const configManager: TestConfigLoader = new TestConfigLoader(configPath);
const config: TestConfig = configManager.getConfigs();

export const Config: TestConfig = config;
