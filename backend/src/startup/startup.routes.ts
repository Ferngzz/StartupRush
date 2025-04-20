import { Router } from 'express';
import {
    addStartup,
    getAllStartups,
    updateStartupScore,
    updateStartupFlags,
    clearData,
} from "./startup.controller";

const startupRouter = Router();

startupRouter.post("", addStartup);
startupRouter.get("", getAllStartups);
startupRouter.patch("/score/:id", updateStartupScore);
startupRouter.patch("/flags/:id", updateStartupFlags);
startupRouter.delete("/delete", clearData)

export default startupRouter;