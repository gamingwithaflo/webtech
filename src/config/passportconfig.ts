import passport from "passport";
import passportLocal from "passport-local";
import { Request, Response, NextFunction } from "express";
import User from "../entity/user";
import {getRepository, Repository} from "typeorm";

export default class PassportConfig {
    private readonly localStrategy;
    private userController: Repository<User>;

    constructor() {
        this.localStrategy = passportLocal.Strategy;
        this.userController = getRepository(User);
    }

    /*
     * use passport and set localStrategy
     * @return Promise<void>
     */
    async initialize() {
        passport.serializeUser<any, any>((req, user, done) => {
            done(undefined, user);
        });

        passport.deserializeUser(async (id, done) => {
            this.userController.findByIds([id])
                .then((user: any) => {
                    done(null, user);
                });
        });

        passport.use(
            new this.localStrategy({ usernameField: "email" }, async (email, password, done) => {
                await this.userController.findOne({ email: email })
                    .then((user: any) => {
                        if (!user) {
                            return done(undefined, false, {message: `Email ${email} not found.`});
                        }
                        if (user.comparePassword(password)) {
                            return done(undefined, user);
                        }
                        return done(undefined, false, {message: "Invalid email or password."});
                    })
                    .catch((error: any) => {
                        return done(error);
                    });
            })
        );
    }

    /*
     * check if user is authenticated
     * @return void
     */
    static isAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    }
}
