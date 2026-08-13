import { Router } from 'express';
import { createWorkout, listWorkouts } from '../controllers/workoutController.js';

const workoutsRouter = Router();

workoutsRouter.get('/', listWorkouts);
workoutsRouter.post('/', createWorkout);

export default workoutsRouter;