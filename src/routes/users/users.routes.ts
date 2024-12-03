import { Router } from 'express';
import { getUsers, getUserById, getGamesByUser, insertUser } from '../../controllers/users.controller';

const router = Router();

router.get('/users', getUsers);
router.get('/:id', getUserById);
router.get('/:id/:platform/games', getGamesByUser);
router.post('/insertUser', insertUser);

export default router;
