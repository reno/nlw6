import 'express-async-errors';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import './database';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
);
const base_url = process.env.BASE_URL;
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening at ${base_url}`)
});