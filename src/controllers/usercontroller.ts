import { Request, Response } from "express";
import {getRepository, Repository} from "typeorm";
import User from "../entity/user";

export default class UserController {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    /*
     * get user profile
     * route GET /profile
     */
    profile(req: Request, res: Response) {
        res.render("pages/profile");
    }

    /*
     * get current user
     * route GET /api/users/current
     */
    // TODO
    currentUser(req: Request, res: Response) {
        res.send(req.user);
    }
}
