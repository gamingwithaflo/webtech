import { Request, Response } from "express";

export default class NotableFeaturesController {
    /*
     * notable-features
     * @route GET /notable-features
     */
    notableFeatures(req: Request, res: Response) {
        res.render("pages/notable-features");
    }
}
