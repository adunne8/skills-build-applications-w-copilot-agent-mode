import { Router } from 'express';
import { createUser, listUsers } from '../controllers/userController.js';

const usersRouter = Router();

usersRouter.get('/', listUsers);
usersRouter.post('/', createUser);

export default usersRouter;