import express from "express";

const apiRouter = express.Router();

// controllers
import * as topicController from "../controllers/topic";
import * as quizController from "../controllers/quiz";

apiRouter.get("/topics", topicController.getTopics);
apiRouter.get("/quiz", quizController.getQuizzes);

export default apiRouter;
