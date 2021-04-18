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
      }
    });
  }
}
