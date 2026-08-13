import { type Request, type Response, type NextFunction } from 'express';
import Activity from '../models/Activity.js';

export async function listActivities(req: Request, res: Response, next: NextFunction) {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .sort({ performedAt: -1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
}

export async function createActivity(req: Request, res: Response, next: NextFunction) {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
}