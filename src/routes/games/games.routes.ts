import { Router } from 'express';
import { getGames, getGameById } from '../../controllers/games.controller';

const router = Router();

router.get('/', getGames);
router.get('/:id', getGameById);

export default router;