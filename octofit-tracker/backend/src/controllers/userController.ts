import { type Request, type Response, type NextFunction } from 'express';
import User from '../models/User.js';

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}