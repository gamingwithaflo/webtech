import { Request, Response } from "express";

export default class HomeController {
    /*
     * home
     * @route GET /
     */
    index(req: Request, res: Response) {
        res.render("pages/index");
    }
}
