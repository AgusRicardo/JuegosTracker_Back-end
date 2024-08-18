import express, { Request, Response, NextFunction } from 'express';
import routers from './routes/index.routes'; 

const PORT = process.env.PORT || 4000;
const app = express();

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
