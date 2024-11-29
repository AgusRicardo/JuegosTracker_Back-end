import { Router } from 'express';
import { getGames, getGameById, createGame } from '../../controllers/games.controller';
import validateCreateGame from '../../middlewares/validateGame.middleware';

const router = Router();

router.post('/createGame', validateCreateGame, createGame);
router.get('/', getGames);
router.get('/:id', getGameById);

export default router;