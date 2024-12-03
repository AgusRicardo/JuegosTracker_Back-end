import { NextFunction, Request, Response } from 'express';
const pool = require('../database');

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await pool.query(`SELECT * FROM "User"`);
        res.json(result.rows);
    } catch (error) {
        next(error)
        return res.status(500).json({
            error: 'Error en la query.',
        })
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await pool.query(`SELECT * FROM public."User" WHERE user_id = $1;`, [id]);
        res.json(result.rows);
    } catch (error) {
        next(error)
        return res.status(500).json({
            error: 'Error en la query.',
        })
    }
};

export const getGamesByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; 
        const { platform } = req.params; 
        
        let query = `
            SELECT 
                g.game_id,
                g.name AS game,
                p.name AS platform,
                c.name AS category,
                g.img_url AS img
            FROM "GameUser" AS gu
            JOIN "Game" AS g ON gu.game_id = g.game_id
            JOIN "Platform" AS p ON g.platform_id = p.platform_id
            JOIN "Category" AS c ON g.category_id = c.category_id
            JOIN "User" AS u ON gu.user_id = u.user_id
            WHERE u.user_id = $1
        `;
        
        const queryParams: Array<string | number> = [id];

        if (platform) {
            query += ` AND p.name ILIKE $2`;
            queryParams.push(`${platform}`);
        }

        const result = await pool.query(query, queryParams);
        res.json(result.rows);
    } catch (error) {
        next(error);
        return res.status(500).json({
            error: 'Error en la query.',
        });
    }
};


export const insertUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, userId } = req.body;
        
        if (!email || !userId) {
            return res.status(400).json({
                error: 'Faltan campos requeridos: email o userId.',
            });
        }

        const query = `
            INSERT INTO public."User" (user_id, email)
            VALUES ($1, $2)
            RETURNING *;
        `;

        const result = await pool.query(query, [userId, email]);
        res.status(201).json({
            message: 'Usuario creado exitosamente.',
            user: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getUsers,
    getUserById,
    getGamesByUser,
    insertUser
};