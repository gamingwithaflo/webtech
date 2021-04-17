import fs from "fs";
import dotenv from "dotenv";
import Logger from "../utils/logger";

export default class EnvConfig {
    private logger;

    constructor() {
        this.logger = new Logger(EnvConfig.name);
        this.initialize();
    }

    /*
     * use dotenv and set config abstraction
     * @return void
     */
    private initialize() {
        if (fs.existsSync(".env")) {
            this.logger.debug("Using .env file to supply config environment variables");
            dotenv.config({ path: ".env" });
        }
    }

    /*
     * get server port
     * @return server_port: string | 3000
     */
    getServerPort() {
        return process.env.PORT || 3000;
    }

    /*
     * get session secret
     * @return session_secret: string
     */
    getSessionSecret() {
        return process.env.SESSION_SECRET || "veryverysecret";
    }
}
