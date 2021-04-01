import { Request, Response } from "express";

// TODO
export const getTopics = (req: Request, res: Response) => {
    res.send({
        "topics": [
            {
                "name": "topic1"
            }
        ]
    });
};
