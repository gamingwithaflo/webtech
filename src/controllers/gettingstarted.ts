import { Request, Response } from "express";

/*
 * getting-started
 * @route GET /getting-started
 */
export const gettingStarted = (req: Request, res: Response) => {
    res.render("pages/getting-started");
};
