import { Chalk, ColorSupportLevel, Options } from 'chalk';
import supportsColor from 'supports-color';
import { SharedLogger } from './shared/SharedLogger.js';

let colorLevel: ColorSupportLevel = 0;

if (supportsColor.stdout) {
    colorLevel = 1;
}

// @ts-expect-error - This is a private property
if (supportsColor.stdout.has256) {
    colorLevel = 2;
}

// @ts-expect-error - This is a private property
if (supportsColor.stdout.has16m) {
    colorLevel = 3;
}

const opts: Options = { level: colorLevel };
const chalk = new Chalk(opts);

export class Logger extends SharedLogger {
    public constructor() {
        super(chalk);
    }
}
