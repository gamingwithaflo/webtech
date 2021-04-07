import { Request, Response } from "express";

export default class AssessmentController {
    /*
     * assessment
     * @route GET /assessment
     */
    assessment(req: Request, res: Response) {
        res.render("pages/assessment");
    }
}
