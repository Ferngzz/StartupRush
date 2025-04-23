import { Router } from 'express';
import {
    addStartup,
    getAllStartups,
    getAllStartupsByEdition,
    updateStartup,
    clearData,
} from "./battle.controller";

const tournamentRouter = Router();

tournamentRouter.post("", addStartup);
tournamentRouter.get("", getAllStartups);
tournamentRouter.delete("/delete", clearData)

export default tournamentRouter;