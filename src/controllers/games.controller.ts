import { NextFunction, Request, Response } from 'express';
const pool = require('../database.ts');

export const getGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query(`SELECT * FROM "Game"`);
    res.json(result.rows);
  } catch (error) {
    next(error)
    return res.status(500).json({
      error: 'Error en la query.',
    })
  }
};

export const getGameById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const result = await pool.query(`SELECT * FROM public."Game" WHERE game_id = $1;`, [id]);
    res.json(result.rows);
  } catch (error) {
    next(error)
    return res.status(500).json({
      error: 'Error en la query.',
    })
  }
};

module.exports = {
  getGames,
  getGameById,
};