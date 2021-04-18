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

      // create user only if unique email not exists
      if (count[1] == 0) {
        connection.manager
          .save(connection.manager.create(User, user))
          .then(() => this.logger.log(`Created example user ${user.email}`));

        /* CREATE QUESTIONS FROM NF1 */
        const questionNF11: Question = new MultipleChoice("Question NF.1.1", "Which of the following is not a built-in React hook?", "useStatus", ["useStatus", "useState", "useReducer", "useContext"]);
        await connection.manager.save(questionNF11)
            .then(() => this.logger.log(`Created question ${questionNF11.title}`))
            .catch((error) => this.logger.error(error));
        const questionNF12: Question = new MultipleChoice("Question NF.1.2", "Which of the following lifecycle methods allows the developer to prevent unnecessary re-rendering of a component by returning false if a render is not required?", "shouldComponentUpdate", ["shouldComponentUpdate", "render", "componentDidMount"]);
        await connection.manager.save(questionNF12)
            .then(() => this.logger.log(`Created question ${questionNF12.title}`))
            .catch((error) => this.logger.error(error));
        const questionNF13: Question = new MultipleChoice("Question NF.1.3", "JavaScript XML is similar in appearance to ...", "HTML", ["HTML", "Go", "Ruby", "Python"]);
        await connection.manager.save(questionNF13)
            .then(() => this.logger.log(`Created question ${questionNF13.title}`))
            .catch((error) => this.logger.error(error));

        /* CREATE QUESTIONS FROM NF2 */
        const questionNF21: Question = new Open("Question NF.2.1", "What are the atomic entities in React called?", "components");
        await connection.manager.save(questionNF21)
            .then(() => this.logger.log(`Created question ${questionNF21.title}`))
            .catch((error) => this.logger.error(error));
        const questionNF22: Question = new Open("Question NF.2.2", "What are the values you can pass in those atomic entities called?", "props");
        await connection.manager.save(questionNF22)
            .then(() => this.logger.log(`Created question ${questionNF22.title}`))
            .catch((error) => this.logger.error(error));
        const questionNF23: Question = new Open("Question NF.2.3", "What is the abbreviation of JavaScript XML?", "JSX");
        await connection.manager.save(questionNF23)
            .then(() => this.logger.log(`Created question ${questionNF23.title}`))
            .catch((error) => this.logger.error(error));

        /* CREATE QUIZZES FROM NF */
        const quizNF1 = new Quiz();
        quizNF1.title = "Notable Features 1";
        quizNF1.questions = [questionNF11, questionNF12, questionNF13];
        await connection.manager.save(quizNF1)
            .then(() => this.logger.log(`Created quiz ${quizNF1.title}`))
            .catch((error) => this.logger.error(error));
        const quizNF2 = new Quiz();
        quizNF2.title = "Notable Features 2";
        quizNF2.questions = [questionNF21, questionNF22, questionNF23];
        await connection.manager.save(quizNF2)
            .then(() => this.logger.log(`Created quiz ${quizNF2.title}`))
            .catch((error) => this.logger.error(error));

        /* CREATE TOPIC */
        const topicNF = new Topic();
        topicNF.title = "Notable Features";
        topicNF.link = "/notable-features";
        topicNF.quizzes = [quizNF1, quizNF2];
        await connection.manager.save(topicNF)
            .then(() => this.logger.log(`Created topic ${topicNF.title}`))
            .catch((error) => this.logger.error(error));
      }
    });
  }
}
