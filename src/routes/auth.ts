import express from "express";
import BaseRouter from "./baserouter";
import AuthController from "../controllers/authcontroller";
import PassportConfig from "../config/passportconfig";

export default class AuthRouter implements BaseRouter {
    private authController;

    constructor() {
        this.authController = new AuthController();
    }

    /*
     * get router
     * @return express router
     */
    getRouter() {
        const authRouter = express.Router();
        authRouter.get('/login', PassportConfig.isNotAuthenticated, (req, res) => this.authController.login(req, res));
        authRouter.get('/register', PassportConfig.isNotAuthenticated, (req, res) => this.authController.register(req, res));
        authRouter.post('/login', (req, res, next) => this.authController.postLogin(req, res, next));
        authRouter.post('/register', (req, res, next) => this.authController.postRegister(req, res, next));
        authRouter.post('/logout', (req, res) => this.authController.logout(req, res));

        return authRouter;
    }
}
