import { Router } from 'express';
import {
  createLeaderboardEntry,
  listLeaderboard,
} from '../controllers/leaderboardController.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', listLeaderboard);
leaderboardRouter.post('/', createLeaderboardEntry);

export default leaderboardRouter;