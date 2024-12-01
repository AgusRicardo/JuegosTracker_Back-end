import express, { Request, Response, NextFunction } from 'express';
import routers from './routes/index.routes';
import 'dotenv/config';

const cors = require("cors");
const PORT = process.env.DB_PORT;
const app = express();

const corsOptions = {
  origin: "https://juegos-tracker-front-end.vercel.app",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(routers);

// Erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: err.message,
  });
});

app.listen(PORT);

PORT ? console.log(`Server on ${PORT}`) : console.log('Server off');
