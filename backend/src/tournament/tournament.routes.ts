import { Router } from 'express';
import {
    addTournament,
    getAllTournaments,
    updateTournament,
    clearData,
} from "./tournament.controller";

const tournament = Router();

tournament.post("/post", addTournament);
tournament.get("/get", getAllTournaments);
tournament.patch("/update/:id", updateTournament);
tournament.delete("/delete", clearData)

export default tournament;