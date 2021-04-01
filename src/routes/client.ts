import express from "express";

const clientRouter = express.Router();

// controllers
import * as homeController from "../controllers/home";
import * as whatIsReactController from "../controllers/whatisreact";
import * as gettingStartedController from "../controllers/gettingstarted";
import * as notableFeaturesController from "../controllers/notablefeatures";
import * as historyController from "../controllers/history";
import * as assessmentController from "../controllers/assessment";
import * as userController from "../controllers/user";

clientRouter.get('/', homeController.index);
clientRouter.get('/what-is-react', whatIsReactController.whatIsReact);
clientRouter.get('/getting-started', gettingStartedController.gettingStarted);
clientRouter.get('/notable-features', notableFeaturesController.notableFeatures);
clientRouter.get('/history', historyController.history);
clientRouter.get('/assessment', assessmentController.assessment);

// TODO
clientRouter.get('/login', userController.login);
clientRouter.get('/register', userController.register);
clientRouter.get('/profile', userController.profile);
// apiRouter.post('/login', userController.action);
// apiRouter.post('/register', userController.action);
// apiRouter.post('/logout', userController.action);

export default clientRouter;
