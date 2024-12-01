import { Request, Response, NextFunction } from 'express';

export const validateEstadistics = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: 'Faltan datos requeridos',
    });
  }

  next();
};

export default validateEstadistics;