import { type Request, type Response, type NextFunction } from 'express';
import Workout from '../models/Workout.js';

export async function listWorkouts(req: Request, res: Response, next: NextFunction) {
  try {
    const workouts = await Workout.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
}

export async function createWorkout(req: Request, res: Response, next: NextFunction) {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
}