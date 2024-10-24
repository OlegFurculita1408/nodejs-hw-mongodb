import dotenv from 'dotenv';
import cors from 'cors';
import pino from 'pino-http';
import express from 'express';
import env from './utils/env.js';
import { ENV_VARS } from './constants/indexEnv.js';
import contactsRouter from './routers/contacts.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';
import { notFoundAnythingMiddlewares } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/indexEnv.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';


dotenv.config();

const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '200kb',
    }),
  );

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(cors());
  app.use(pino());
  app.use(cookieParser());

  app.get('/', (req, res, next) => {
    res.status(200).json({
      message: 'Welcome to the Contacts API!',
    });
    next();
  });

  app.use(contactsRouter);

  app.use(router);

  app.use(notFoundAnythingMiddlewares);

  app.use(errorHandlerMiddleware);

  app.use('/uploads', express.static(UPLOAD_DIR));

  const PORT = env(ENV_VARS.PORT, 3000);
    try {
      app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
      } catch (error) {
        console.error('Failed to start application:', error.message);
  }

  app.use((req, res, next) => {
    res.status(404).json({
       message: 'Not found' });
    next();
  });
};

export { setupServer };