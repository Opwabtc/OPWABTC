import { ILogger } from '../interfaces/ILogger.js';
import { lightenColor } from './SharedFunctions.js';

import { Chalk, ChalkInstance } from 'chalk';

export class SharedLogger implements ILogger {
    public readonly moduleName: string = '';
    public readonly logColor: string = '#00bfff';

    protected enableLogs: boolean = true;
    protected hideLogs: boolean = false;

    readonly #pink: string = '#ff00ff';
    readonly #lightPink: string = lightenColor(this.#pink, 75);
    readonly #purple: string = '#9400d3';
    readonly #lightPurple: string = lightenColor(this.#purple, 15);
    readonly #lighterPurple: string = lightenColor(this.#lightPurple, 15);
    readonly #green: string = '#7cfc00';
    readonly #lightGreen: string = lightenColor(this.#green, 15);
    readonly #moca: string = '#ffdead';
    readonly #lightMoca: string = lightenColor(this.#moca, 15);
    readonly #orange: string = '#ff8c00';
    readonly #lightOrange: string = lightenColor(this.#orange, 15);
    readonly #red: string = '#ff4500';
    readonly #lightRed: string = lightenColor(this.#red, 15);
    readonly #white: string = '#ffffff';
    readonly #lightWhite: string = lightenColor(this.#white, 15);
    readonly #darkred: string = '#8b0000';
    readonly #lightdarkred: string = lightenColor(this.#darkred, 15);

    private prefix: string = '';

    public constructor(protected readonly chalk: ChalkInstance = new Chalk()) {
        this.moduleName = this.constructor.name;
    }

    public setLogPrefix(prefix: string): void {
        this.prefix = prefix;
    }

    public getStartPrefix(): string {
        return this.prefix;
    }

    public disable(): void {
        this.enableLogs = false;
    }

    public enable(): void {
        this.enableLogs = true;
    }

    public fancyLog(
        msg1: string,
        highlight1: string,
        msg2: string,
        highlight2: string,
        msg3: string,
    ): void {
        if (!this.enableLogs) return;

        console.log(
            this.chalk.hex(this.#pink)(`${this.getStartPrefix()}[${this.moduleName} INFO]: `) +
                this.chalk.hex(this.#white)(msg1) +
                ' ' +
                this.chalk.hex(this.#lightOrange)(highlight1) +
                ' ' +
                this.chalk.hex(this.#white)(msg2) +
                ' ' +
                this.chalk.hex(this.#lighterPurple)(highlight2) +
                ' ' +
                this.chalk.hex(this.#white)(msg3),
        );
    }

    public log(...args: string[]): void {
        if (!this.enableLogs) return;

        if (!this.hideLogs) {
            const light = lightenColor(this.logColor, 15);
            console.log(
                this.chalk.hex(this.logColor)(
                    `${this.getStartPrefix()}[${this.moduleName} LOG]: `,
                ) + this.chalk.hex(light)(...args),
            );
        }
    }

    public lightOrangeLog(...args: string[]): void {
        if (!this.enableLogs) return;

        if (!this.hideLogs) {
            console.log(
                this.chalk.hex(this.#lightOrange)(
                    `${this.getStartPrefix()}[${this.moduleName} LOG]: `,
                ) + this.chalk.hex(this.#white)(...args),
            );
        }
    }

    public error(...args: string[]): void {
        if (!this.enableLogs) return;

        console.log(
            this.chalk.hex(this.#red)(`${this.getStartPrefix()}[${this.moduleName} ERROR]: `) +
                this.chalk.hex(this.#lightRed)(...args),
        );
    }

    public warn(...args: string[]): void {
        if (!this.enableLogs) return;

        console.log(
            this.chalk.hex(this.#orange)(`${this.getStartPrefix()}[${this.moduleName} WARN]: `) +
                this.chalk.hex(this.#lightOrange)(...args),
        );
    }

    public debug(...args: string[]): void {
        if (!this.enableLogs) return;

        if (!this.hideLogs) {
            console.log(
                this.chalk.hex(this.#moca)(`${this.getStartPrefix()}[${this.moduleName} DEBUG]: `) +
                    this.chalk.hex(this.#lightMoca)(...args),
            );
        }
    }

    public success(...args: string[]): void {
        if (!this.enableLogs) return;

        if (!this.hideLogs) {
            console.log(
                this.chalk.hex(this.#green)(
                    `${this.getStartPrefix()}[${this.moduleName} SUCCESS]: `,
                ) + this.chalk.hex(this.#lightGreen)(...args),
            );
        }
    }

    public fail(...args: string[]): void {
        if (!this.enableLogs) return;

        if (!this.hideLogs) {
            console.log(
                this.chalk.hex(this.#red)(`${this.getStartPrefix()}[${this.moduleName} FAIL]: `) +
                    this.chalk.hex(this.#lightRed)(...args),
            );
        }
    }

    public debugBright(...args: string[]): void {
        if (!this.enableLogs) return;

        if (!this.hideLogs) {
            console.log(
                this.chalk.hex(this.#purple)(
                    `${this.getStartPrefix()}[${this.moduleName} DEBUG]: `,
                ) + this.chalk.hex(this.#lightPurple)(...args),
            );
        }
    }

    public important(...args: string[]): void {
        if (!this.enableLogs) return;

        console.log(
            this.chalk.hex(this.#pink)(`${this.getStartPrefix()}[${this.moduleName} IMPORTANT]: `) +
                this.chalk.hex(this.#lightPink)(...args),
        );
    }

    public panic(...args: string[]): void {
        if (!this.enableLogs) return;

        console.log(
            this.chalk.hex(this.#darkred)(
                `${this.getStartPrefix()}[${this.moduleName} HELP PANIC]: `,
            ) + this.chalk.hex(this.#lightdarkred)(...args),
        );
    }

    public info(...args: string[]): void {
        if (!this.enableLogs) return;

        console.log(
            this.chalk.hex(this.#pink)(`${this.getStartPrefix()}[${this.moduleName} INFO]: `) +
                this.chalk.hex(this.#white)(...args),
        );
    }

    public securityNotice(...args: string[]): void {
        if (!this.enableLogs) return;

        console.log(
            this.chalk.hex('#22d8e6')(
                `${this.getStartPrefix()}[${this.moduleName} SECURITY NOTICE]: `,
            ) + this.chalk.hex('#22e3e6')(...args),
        );
    }

    public traceLog(...args: string[]): void {
        if (!this.enableLogs) return;

        console.log(
            this.chalk.hex('#ffffff')(`${this.getStartPrefix()}[${this.moduleName} TRACE LOG]: `) +
                this.chalk.hex(this.#lightWhite)(...args),
        );
    }
}
