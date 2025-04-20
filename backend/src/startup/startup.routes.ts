import { Router } from 'express';
import {
    addStartup,
    getAllStartups,
    updateStartupScore,
} from "./startup.controller";

const startupRouter = Router();

startupRouter.post("", addStartup);
startupRouter.get("", getAllStartups);
startupRouter.patch("/score/:id", updateStartupScore);

export default startupRouter;