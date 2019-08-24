import { Router, Request, Response } from "express";
const routes = Router();

import { AnwserGenerator } from "./../content/anwsers";

routes.post("/", (req: Request, res: Response) => {
    res.json({ message: "API is active"});
});

routes.post("/question", (req: Request, res: Response) => {
    const result = AnwserGenerator.generator();
    res.json({ answer: result, quote: (result.length * 1000) });
});

export default routes;