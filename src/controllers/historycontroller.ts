import { Request, Response } from "express";

export default class HistoryController {
    /*
     * history
     * @route GET /history
     */
    history(req: Request, res: Response) {
        res.render("pages/history");
    }
}
