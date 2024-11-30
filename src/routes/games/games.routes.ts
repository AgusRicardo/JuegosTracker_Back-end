import { Router } from 'express';
import { getGames, getGameById, createGame, deleteGame } from '../../controllers/games.controller';
import validateCreateGame from '../../middlewares/validateGame.middleware';
import validateDeleteGame from '../../middlewares/validateDeleteGame.middleware';

const router = Router();

router.post('/createGame', validateCreateGame, createGame);
router.get('/', getGames);
router.get('/:id', getGameById);
router.delete('/deleteGame', validateDeleteGame, deleteGame)

export default router;