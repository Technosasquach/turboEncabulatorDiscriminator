import { Router, Request, Response } from "express";
const routes = Router();

routes.post("/", (req: Request, res: Response) => {
    res.json({ message: "API is active"});
});

export default routes;