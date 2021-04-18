import Logger from "../utils/logger";
import User from "../entity/user";
import Quiz from "../entity/quiz";
import Topic from "../entity/topic";
import { Connection } from "typeorm";
import Question from "../entity/question";
import Open from "../entity/open";
import MultipleChoice from "../entity/multiplechoice";
import AuthController from "../controllers/authcontroller";

export default class DataConfig {
  private logger;

  constructor() {
    this.logger = new Logger(DataConfig.name);
  }

  /*
   * generate example data
   * @return Promise<void>
   */
  async initialize(connection: Connection) {
    // user example@user.mail
    await connection.manager.findAndCount(User).then(async (count) => {
      const user = new User();
      user.name = "example user";
      user.email = "example@user.mail";
      user.password = await AuthController.hashPassword("secretPassword");
      user.loginTime = Date.now();

      // create user only if unique email not exists
      if (count[1] == 0) {
        connection.manager
          .save(connection.manager.create(User, user))
          .then(() => this.logger.log(`Created example user ${user.email}`));

        // question questionAAA
        const questionAAA: Question = new Open(
          "questionAAA",
          "problemstatement",
          "correctanswer"
        );
        await connection.manager
          .save(questionAAA)
          .then(() => this.logger.log(`Created example ${questionAAA.title}`))
          .catch((error) => this.logger.error(error));

        // question questionAAB
        const questionAAB: Question = new MultipleChoice(
          "questionAAB",
          "problemstatement",
          "correctanswer",
          ["a", "b"]
        );
        await connection.manager
          .save(questionAAB)
          .then(() => this.logger.log(`Created example ${questionAAB.title}`))
          .catch((error) => this.logger.error(error));

        // quiz quizAA
        const quizAA = new Quiz();
        quizAA.title = "quizAA";
        quizAA.questions = [questionAAA, questionAAB];
        await connection.manager
          .save(quizAA)
          .then(() => this.logger.log(`Created example ${quizAA.title}`))
          .catch((error) => this.logger.error(error));

        // question questionAAA
        const questionABA: Question = new Open(
          "questionABA",
          "problemstatement",
          "correctanswer"
        );
        await connection.manager
          .save(questionABA)
          .then(() => this.logger.log(`Created example ${questionABA.title}`))
          .catch((error) => this.logger.error(error));

        // question questionAAB
        const questionABB: Question = new MultipleChoice(
          "questionABB",
          "problemstatement",
          "correctanswer",
          ["a", "b"]
        );
        await connection.manager
          .save(questionABB)
          .then(() => this.logger.log(`Created example ${questionABB.title}`))
          .catch((error) => this.logger.error(error));

        // quiz quizAB
        const quizAB = new Quiz();
        quizAB.title = "quizAB";
        quizAB.questions = [questionABA, questionABB];
        await connection.manager
          .save(quizAB)
          .then(() => this.logger.log(`Created example ${quizAB.title}`))
          .catch((error) => this.logger.error(error));

        // topic topicA
        const topicA = new Topic();
        topicA.title = "topicA";
        topicA.link = "#link";
        topicA.quizzes = [quizAA, quizAB];
        await connection.manager
          .save(topicA)
          .then(() => this.logger.log(`Created example ${topicA.title}`))
          .catch((error) => this.logger.error(error));
      }
    });
  }
}
