import { Request, Response } from "express";

/*
 * home
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
    res.render("pages/index");
};
