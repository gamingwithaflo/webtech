import express from "express";

const pageRouter = express.Router();

// controllers
import * as homeController from "../controllers/home";
import * as whatIsReactController from "../controllers/whatisreact";
import * as gettingStartedController from "../controllers/gettingstarted";
import * as notableFeaturesController from "../controllers/notablefeatures";
import * as historyController from "../controllers/history";
import * as assessmentController from "../controllers/assessment";

pageRouter.get('/', homeController.index);
pageRouter.get('/what-is-react', whatIsReactController.whatIsReact);
pageRouter.get('/getting-started', gettingStartedController.gettingStarted);
pageRouter.get('/notable-features', notableFeaturesController.notableFeatures);
pageRouter.get('/history', historyController.history);
pageRouter.get('/assessment', assessmentController.assessment);

export default pageRouter;
