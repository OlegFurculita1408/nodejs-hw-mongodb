import dotenv from 'dotenv';
import express from 'express';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

dotenv.config();
const app = express();


const startServer = async () => {
  await initMongoConnection();

  setupServer(app);  
};
startServer();
