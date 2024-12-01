import { Router } from 'express';
import { getGames, getGameById, createGame, deleteGame, getEstadistics } from '../../controllers/games.controller';
import validateCreateGame from '../../middlewares/validateGame.middleware';
import validateDeleteGame from '../../middlewares/validateDeleteGame.middleware';
import validateEstadistics from '../../middlewares/validateEstadistics.middleware';

const router = Router();

router.post('/createGame', validateCreateGame, createGame);
router.get('/', getGames);
router.get('/:id', getGameById);
router.delete('/deleteGame', validateDeleteGame, deleteGame);
router.post('/estadistics/user_id', validateEstadistics, getEstadistics);

export default router;