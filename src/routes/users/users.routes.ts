import { Router } from 'express';
import { getUsers, getUserById, getGamesByUser } from '../../controllers/users.controller';

const router = Router();

router.get('/users', getUsers);
router.get('/:id', getUserById);
router.get('/:id/:platform/games', getGamesByUser);

export default router;
