import express, { Request, Response, NextFunction } from 'express';
import routers from './routes/index.routes'; 
import 'dotenv/config';
import connectDB from './database';
import { syncDatabase } from './syncDatabase';

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

syncDatabase();

app.use(routers);

// Erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
