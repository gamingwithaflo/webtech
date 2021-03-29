import { Request, Response } from "express";

export const getTopics = (req: Request, res: Response) => {
    res.render("/topics", {
        title: "Topics"
    });
};
