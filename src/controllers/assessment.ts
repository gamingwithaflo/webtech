import { Request, Response } from "express";

/*
 * assessment
 * @route GET /assessment
 */
export const assessment = (req: Request, res: Response) => {
    // TODO
    res.render("pages/assessment");
};
