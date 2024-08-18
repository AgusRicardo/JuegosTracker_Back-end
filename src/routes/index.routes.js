const { Router } = require('express');
const usersRoutes = require('./users/users.routes');

const router = Router();

// All routes
router.use(usersRoutes);

module.exports = router;