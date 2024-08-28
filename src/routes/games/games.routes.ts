import { Router } from 'express';
import { getGames, getGameById, createGame } from '../../controllers/games.controller';

const router = Router();

router.get('/', getGames);
router.get('/:id', getGameById);
router.post('/createGame', createGame);

export default router;