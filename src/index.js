import dotenv from 'dotenv';
import express from 'express';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/indexEnv.js';

dotenv.config();
const app = express();

const startServer = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);

  setupServer(app);  
};
startServer();