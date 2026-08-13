import { Router } from 'express';
import { createActivity, listActivities } from '../controllers/activityController.js';

const activitiesRouter = Router();

activitiesRouter.get('/', listActivities);
activitiesRouter.post('/', createActivity);

export default activitiesRouter;