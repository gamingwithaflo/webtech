import App from "./app";
import {createConnection} from "typeorm";
import Logger from "./utils/logger";

export class Server {
    private logger;

    constructor() {
        this.logger = new Logger(Server.name);
    }

    /*
     * create app and typeorm connection
     */
    run() {
        createConnection()
            .then(async connection => {
                new App(connection).listen();
            })
            .catch(error => {
                this.logger.error(error);
            });
    }
}

// start
new Server().run();
