import { Router } from 'express';
import usersRoutes from './users/users.routes';
import gamesRoutes from './games/games.routes';


const router = Router();

// All routes
router.use("/user", usersRoutes);
router.use("/games", gamesRoutes);

export default router;
