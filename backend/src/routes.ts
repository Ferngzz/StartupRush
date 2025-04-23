import { Router } from 'express';
import startupRouter from './startup/startup.routes';
import battleRouter from './battle/battle.routes';
import tournamentRouter from './tournament/tournament.routes';

const indexRoute = Router();

indexRoute.use('/startup', startupRouter);
indexRoute.use('/tournament', tournamentRouter);
indexRoute.use('/battle', battleRouter);

export default indexRoute;