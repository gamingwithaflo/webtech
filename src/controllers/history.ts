import { Request, Response } from "express";

/*
 * history
 * @route GET /history
 */
export const history = (req: Request, res: Response) => {
    res.render("pages/history");
};
