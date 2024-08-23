import express from 'express';
import path from 'node:path';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cookieParser());

  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.use(express.static(path.resolve('src', 'uploads')));
  app.use('/api-docs', swaggerDocs());

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
