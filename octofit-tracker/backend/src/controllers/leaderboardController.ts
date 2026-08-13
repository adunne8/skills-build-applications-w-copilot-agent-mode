import { type Request, type Response, type NextFunction } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

export async function listLeaderboard(req: Request, res: Response, next: NextFunction) {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('user', 'name email')
      .sort({ points: -1 });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
}

export async function createLeaderboardEntry(req: Request, res: Response, next: NextFunction) {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
}