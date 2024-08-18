import { Router } from 'express';

const router = Router();

// GET user by id
router.get('/user/:id', (req, res) => {
  const id = req.params.id;
  res.json({ id });
})

// GET all users
router.get('/users', (req, res) => {
  res.json({ users: "all users" });
})

export default router;
