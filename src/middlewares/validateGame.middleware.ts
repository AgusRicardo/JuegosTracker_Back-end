import { Request, Response, NextFunction } from 'express';

export const validateCreateGame = (req: Request, res: Response, next: NextFunction) => {
  const { name, img_url, platform_id, category_id, userId } = req.body;

  if (!name || !img_url || !platform_id || !category_id ||!userId) {
    return res.status(400).json({
      error: 'Faltan datos requeridos',
    });
  }

  next();
};

export default validateCreateGame;
