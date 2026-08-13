import { type Request, type Response, type NextFunction } from 'express';
import Team from '../models/Team.js';

export async function listTeams(req: Request, res: Response, next: NextFunction) {
  try {
    const teams = await Team.find().populate('members', 'name email').sort({ createdAt: -1 });
    res.json(teams);
  } catch (error) {
    next(error);
  }
}

export async function createTeam(req: Request, res: Response, next: NextFunction) {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
}