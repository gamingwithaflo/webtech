import express from "express";
import BaseRouter from "./baserouter";
import UserController from "../controllers/usercontroller";
import TopicController from "../controllers/topiccontroller";
import QuizController from "../controllers/quizcontroller";
import Attemptcontroller from "../controllers/attemptcontroller";

export default class ApiRouter implements BaseRouter {
    private userController;
    private topicController;
    private quizController;
    private attemptController;

    constructor() {
        this.userController = new UserController();
        this.topicController = new TopicController();
        this.quizController = new QuizController();
        this.attemptController = new Attemptcontroller();
    }

    /*
     * get router
     * @return express router
     */
    getRouter() {
        const apiRouter = express.Router();
        apiRouter.use("/users", this.getApiUsersRouter());
        apiRouter.use("/assessment", this.getApiAssessmentRouter());
        apiRouter.use("/attempts", this.getApiAttemptsRouter());

        return apiRouter;
    }

    /*
     * create user router
     * @return express router
     */
    private getApiUsersRouter() {
        const usersRouter = express.Router();
        usersRouter.get("/current", (req, res) => this.userController.currentUser(req, res));

        return usersRouter;
    }

    /*
     * create assessments router
     * @return express router
     */
    private getApiAssessmentRouter() {
        const assessmentRouter = express.Router();
        assessmentRouter.get("/topics", (req, res) => this.topicController.getTopics(req, res));
        assessmentRouter.get("/quizzes/:quizId", (req, res) => this.quizController.getQuiz(req, res));
        // assessmentRouter.get("/quiz/:quizId/:questionId", this.quizController.getQuizQuestion);

        return assessmentRouter;
    }

    /*
     * create attempts router
     * @return express router
     */
    private getApiAttemptsRouter() {
        const attemptsRouter = express.Router();
        attemptsRouter.get("/", (req, res) => this.attemptController.getAttempts(req, res));
        attemptsRouter.post("/", (req, res) => this.attemptController.postAttempt(req, res));

        return attemptsRouter;
    }
}
