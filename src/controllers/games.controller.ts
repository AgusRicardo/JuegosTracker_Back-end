import { NextFunction, Request, Response } from 'express';
const pool = require('../database');

export const getEstadistics = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;  
  try {
    const result = await pool.query(`
      SELECT 
        COALESCE(p.name, 'Total General') AS plataforma,
        COUNT(*) AS total_juegos
      FROM "GameUser" gu
      JOIN "Game" g ON gu.game_id = g.game_id
      JOIN "Platform" p ON g.platform_id = p.platform_id
      WHERE gu.user_id = $1
      GROUP BY 
        ROLLUP(p.name)
      ORDER BY total_juegos DESC;`, [userId]);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};


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
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM public."Game" WHERE game_id = $1;`, [id]);
    res.json(result.rows);
  } catch (error) {
    next(error)
    return res.status(500).json({
      error: 'Error en la query.',
    })
  }
};

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  const { name, img_url, platform_id, category_id, userId } = req.body;
  try {
    await pool.query('BEGIN');
    const insertGameQuery = `
      INSERT INTO public."Game" (name, img_url, platform_id, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING game_id;
    `;
    const gameResult = await pool.query(insertGameQuery, [name, img_url, platform_id, category_id]);

    if (gameResult.rowCount === 0) {
      throw new Error('No se pudo insertar el juego.');
    }

    const gameId = gameResult.rows[0].game_id;
    const insertGameUserQuery = `
      INSERT INTO public."GameUser" (game_id, user_id)
      VALUES ($1, $2);
    `;
    await pool.query(insertGameUserQuery, [gameId, userId]);
    await pool.query('COMMIT');

    res.status(201).json({
      message: 'Juego creado con éxito.',
      gameId,
    });
  } catch (error) {
    await pool.query('ROLLBACK');
    next(error);
    return res.status(500).json({
      error: 'Error al insertar el juego y la relación.',
    });
  }
};

export const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
  const { gameId, userId } = req.body;

  try {
    const deleteGameQuery = `
      DELETE FROM public."GameUser"
      WHERE game_id = $1
      AND user_id = $2;
    `;
    const gameResult = await pool.query(deleteGameQuery, [gameId, userId]);
    if (gameResult.rowCount === 0) {
      throw new Error('No se pudo borrar el juego.');
    }
    
    res.status(201).json({
      message: 'Juego borrado con éxito.',
      gameId,
      userId
    });

  } catch (error) {
    next(error);
    return res.status(500).json({
      error: 'Error al borrar el juego.',
    });
  }
};

module.exports = {
  getGames,
  getGameById,
  createGame,
  deleteGame,
  getEstadistics
};