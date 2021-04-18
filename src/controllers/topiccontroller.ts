/*

For retrieving the quizzes of a topic (api)

*/

import { Request, Response } from "express";
import {getRepository, Repository} from "typeorm";
import Topic from "../entity/topic";

export default class TopicController {
    private topicRepository: Repository<Topic>;

    constructor() {
        this.topicRepository = getRepository(Topic);
    }

    /*
     * get topics
     * route GET /api/assessment/topics
     */
    async getTopics(req: Request, res: Response) {
        const items = await this.topicRepository
            .createQueryBuilder("topic")
            .leftJoinAndSelect("topic.quizzes", "quiz")
            .getMany();

        res.json(items);
    }
}
