import dotenv from 'dotenv';
import cors from 'cors';
import pino from 'pino-http';
import express from 'express';
import env from './utils/env.js';
import { ENV_VARS } from './constants/indexEnv.js';
import { getContactsController, getContactByIdController } from './controllers/contacts.js';

dotenv.config();

const PORT = env(ENV_VARS.PORT, 3000);

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());

  app.get('/', (req, res, next) => {
    res.status(200).json({
      message: 'Welcome to the Contacts API!',
    });
    next();
  });

  app.get('/contacts', getContactsController);

  app.get('/contacts/:contactId', getContactByIdController);

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