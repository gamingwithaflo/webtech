import { Request, Response } from "express";

/*
 * what-is-react
 * @route GET /what-is-react
 */
export const whatIsReact = (req: Request, res: Response) => {
    res.render("pages/what-is-react");
};
