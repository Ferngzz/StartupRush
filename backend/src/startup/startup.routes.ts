import { Router } from 'express';
import {
    addStartup,
    getAllStartups,
    updateStartup,
    clearData,
} from "./startup.controller";

const startupRouter = Router();

startupRouter.post("", addStartup);
startupRouter.get("", getAllStartups);
startupRouter.patch("/update/:id", updateStartup);
startupRouter.delete("/delete", clearData)

export default startupRouter;