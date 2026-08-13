import { Router } from 'express';
import { createTeam, listTeams } from '../controllers/teamController.js';

const teamsRouter = Router();

teamsRouter.get('/', listTeams);
teamsRouter.post('/', createTeam);

export default teamsRouter;