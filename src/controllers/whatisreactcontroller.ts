import { Request, Response } from "express";

export default class WhatIsReactController {
    /*
     * what-is-react
     * @route GET /what-is-react
     */
    whatIsReact(req: Request, res: Response) {
        res.render("pages/what-is-react");
    }
}
