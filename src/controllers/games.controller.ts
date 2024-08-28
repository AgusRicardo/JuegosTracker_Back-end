import { NextFunction, Request, Response } from 'express';
import { Game } from '../models';


export const getGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const games = await Game.find();

    if (games.length === 0) {
      return res.status(200).json({ message: 'No games found'});
    }

    return res.status(200).json({
      message: 'Games found',
      error: false,
      data: games,
    });
  } catch (error) {
    next(error);
  }
}

export const getGameById = async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    return res.json(game);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export const createGame = async (req: Request, res: Response) => {
  try {
    const game = new Game(req.body);
    const newGame = await game.save();

    return res.status(201).json(newGame);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}



