import Logger from "../utils/logger";
import User from "../entity/user";
import Quiz from "../entity/quiz";
import Topic from "../entity/topic";
import {Connection} from "typeorm";
import Question from "../entity/question";
import Open from "../entity/open";
import MultipleChoice from "../entity/multiplechoice";

export default class Dataconfig {
    private logger;

    constructor() {
        this.logger = new Logger(Dataconfig.name);
    }

    /*
     * generate example data
     * @return Promise<void>
     */
    async initialize(connection: Connection) {
        // user b@b.b
        await connection.manager.findAndCount(User)
            .then((count) => {
                // create user only if unique email not exists
                if (count[1] == 0) {
                    connection.manager.save(connection.manager.create(User, {
                        name: "b",
                        email: "b@b.b",
                        password: "p"
                    }))
                        .then(() => this.logger.log("Created example user b@b.b"));
                }
            });

        // question questionAAA
        const questionAAA: Question = new Open("questionAAA", "problemstatement", "correctanswer");
        await connection.manager.save(questionAAA)
            .then(() => this.logger.log(`Created example ${questionAAA.title}`))
            .catch((error) => this.logger.error(error));

        // question questionAAB
        const questionAAB: Question = new MultipleChoice("questionAAB", "problemstatement", "correctanswer", ["a", "b"]);
        await connection.manager.save(questionAAB)
            .then(() => this.logger.log(`Created example ${questionAAB.title}`))
            .catch((error) => this.logger.error(error));

        // quiz quizAA
        const quizaa = new Quiz();
        quizaa.title = "quizAA";
        quizaa.questions = [questionAAA, questionAAB];
        await connection.manager.save(quizaa)
            .then(() => this.logger.log(`Created example ${quizaa.title}`))
            .catch((error) => this.logger.error(error));

        // quiz quizAB
        const quizab = new Quiz();
        quizab.title = "quizAB";
        await connection.manager.save(quizab)
            .then(() => this.logger.log(`Created example ${quizab.title}`))
            .catch((error) => this.logger.error(error));

        // topic topicA
        const topica = new Topic();
        topica.title = "topicA";
        topica.link = "#link";
        topica.quizzes = [quizaa, quizab];
        await connection.manager.save(topica)
            .then(() => this.logger.log(`Created example ${topica.title}`))
            .catch((error) => this.logger.error(error));
    }
}
