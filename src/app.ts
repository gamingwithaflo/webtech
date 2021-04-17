import "reflect-metadata";
import express from "express";
import EnvConfig from "./config/envconfig";
import path from "path";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import flash from "express-flash";
import Logger from "./utils/logger";
import ApiRouter from "./routes/apirouter";
import ClientRouter from "./routes/clientrouter";
import AuthRouter from "./routes/authrouter";
import {Connection} from "typeorm";
import PassportConfig from "./config/passportconfig";
import DataConfig from "./config/dataconfig";

export default class App {
    private app;
    private env;
    private logger;
    private connection;

    constructor(connection: Connection) {
        this.app = express();
        this.env = new EnvConfig();
        this.logger = new Logger(App.name);
        this.connection = connection;
        this.initialize().catch((error) => this.logger.error(error));
    }

    /*
     * initialize configurations for app
     * @return void
     */
    private async initialize() {
        // express and required packages configuration
        this.app.set("port", this.env.getServerPort());
        this.app.set("view engine", "pug");
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(session({
            resave: true,
            saveUninitialized: true,
            secret: this.env.getSessionSecret()
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(flash());

        // passport
        new PassportConfig().initialize()
            .then(() => this.logger.log("Setup passport config"));

        // pug template engine
        this.app.set("views", path.join(__dirname, "../src/views"));

        // authentication
        this.app.use((req, res, next) => {
            res.locals.user = req.user;
            next();
        });
        this.app.use((req, res, next) => {
            res.locals.isAuthenticated = req.isAuthenticated();
            next();
        });

        // routers
        this.app.use("/api", new ApiRouter().getRouter());
        this.app.use("/", new ClientRouter().getRouter());
        this.app.use("/", new AuthRouter().getRouter());

        // error handling for page not found, ajax and general
        this.app.use((req, res) => {
            res.status(404).render("pages/error");
        });
        this.app.use((err: any, req: any, res: any, next: any) => {
            if (req.xhr) {
                res.status(500).send('Ajax failed');
            } else {
                res.status(500).send('Something failed');
            }
        });

        // set default data
        await new DataConfig().initialize(this.connection).catch((error) => this.logger.error(error));
    }

    /*
     * listen to port
     * @return Server
     */
    listen() {
        return this.app.listen(this.app.get("port"), () => {
            this.logger.log(`Running at http://localhost:${this.app.get("port")} in ${this.app.get("env")} mode`);
            this.logger.log("Press ctrl-c to stop");
        });
    }
}
