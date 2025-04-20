import { Router } from 'express';
import startupRouter from './startup/startup.routes';

const indexRoute = Router();

indexRoute.use('/startup', startupRouter);

export default indexRoute;