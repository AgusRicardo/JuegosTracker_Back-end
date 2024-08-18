import { Router } from 'express';
import usersRoutes from './users/users.routes';

const router = Router();

// All routes
router.use(usersRoutes);

export default router;
