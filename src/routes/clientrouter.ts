import express from "express";
import PassportConfig from "../config/passportconfig";
import BaseRouter from "./baserouter";
import HomeController from "../controllers/homecontroller";
import WhatIsReactController from "../controllers/whatisreactcontroller";
import GettingStartedController from "../controllers/gettingstartedcontroller";
import NotableFeaturesController from "../controllers/notablefeaturescontroller";
import HistoryController from "../controllers/historycontroller";
import AssessmentController from "../controllers/assessmentcontroller";
import UserController from "../controllers/usercontroller";
import AuthController from "../controllers/authcontroller";

export default class ClientRouter implements BaseRouter {
    private homeController;
    private whatIsReactController;
    private gettingStartedController;
    private notableFeaturesController;
    private historyController;
    private assessmentController;
    private userController;
    private authController;

    constructor() {
        this.homeController = new HomeController();
        this.whatIsReactController = new WhatIsReactController();
        this.gettingStartedController = new GettingStartedController();
        this.notableFeaturesController = new NotableFeaturesController();
        this.historyController = new HistoryController();
        this.assessmentController = new AssessmentController();
        this.userController = new UserController();
        this.authController = new AuthController();
    }

    /*
     * get router
     * @return express router
     */
    getRouter() {
        const clientRouter = express.Router();

        clientRouter.get('/', (req, res) => this.homeController.index(req, res));
        clientRouter.get('/what-is-react', (req, res) => this.whatIsReactController.whatIsReact(req, res));
        clientRouter.get('/getting-started', (req, res) => this.gettingStartedController.gettingStarted(req, res));
        clientRouter.get('/notable-features', (req, res) => this.notableFeaturesController.notableFeatures(req, res));
        clientRouter.get('/history', (req, res) => this.historyController.history(req, res));
        clientRouter.get('/assessment', (req, res) => this.assessmentController.assessment(req, res));

        clientRouter.get('/profile', PassportConfig.isAuthenticated, (req, res) => this.userController.profile(req, res));

        return clientRouter;
    }
}
