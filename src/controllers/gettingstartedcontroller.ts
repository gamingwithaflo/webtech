import { Request, Response } from "express";

export default class GettingStartedController {
    /*
     * getting-started
     * @route GET /getting-started
     */
    gettingStarted(req: Request, res: Response) {
        res.render("pages/getting-started");
    }
}
