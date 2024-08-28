import { Session } from 'inspector';
import {User, Game, Category} from './models';

const user = new User({
  name: 'Test name',
  lastName: 'Test lastName',
  email: 'test@gmail.com',
  isAdmin: true,
});

const game = new Game({
  name: 'Test game',
  description: 'Test description',
  img_url: 'https://test.com',
  platform: 'Test platform',
  category: 'Test category',
});

const category = new Category({
  name: 'Test category',
  description: 'Test description',
  games: ['Test game'],
});

export const syncDatabase = async () => {
  try {
    const newUser = await user.save();
    game.ownerId = newUser.id;
    await game.save();
    await category.save();
  } catch (error) {
    console.log(error);
  }
};

