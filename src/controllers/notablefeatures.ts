import { Request, Response } from "express";

/*
 * notable-features
 * @route GET /notable-features
 */
export const notableFeatures = (req: Request, res: Response) => {
    res.render("pages/notable-features");
};
