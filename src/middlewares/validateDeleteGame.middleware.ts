import { Request, Response, NextFunction } from 'express';

export const validateDeleteGame = (req: Request, res: Response, next: NextFunction) => {
  const { gameId, userId } = req.body;

  if (!gameId || !userId) {
    return res.status(400).json({
      error: 'Faltan datos requeridos',
    });
  }

  next();
};

export default validateDeleteGame;