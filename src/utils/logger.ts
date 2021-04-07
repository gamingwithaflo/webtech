/*
 * logger abstraction
 */
export default class Logger {
    private logger;
    private readonly name;

    constructor(name: string) {
        this.logger = console;
        this.name = name;
    }

    log(message: string) {
        console.log(Logger.output(this.name, message));
    }

    info(message: string) {
        console.info(Logger.output(this.name, message));
    }

    error(message: string) {
        console.error(Logger.output(this.name, message));
    }

    debug(message: string) {
        console.debug(Logger.output(this.name, message));
    }

    static output(name: string, message: string) {
        return `${name}: ${message}`;
    }
}
