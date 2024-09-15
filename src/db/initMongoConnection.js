import mongoose from 'mongoose';
import { env } from '../utils/env';
import { MONGODB_DB_VARS } from '../constants/indexEnv';


const initMongoConnection = async () => {

  try {
    const user = env(MONGODB_DB_VARS.MONGODB_USER);
    const pasword = env(MONGODB_DB_VARS.MONGODB_PASSWORD);
    const url = env(MONGODB_DB_VARS.MONGODB_URL);
    const db = env(MONGODB_DB_VARS.MONGODB_DB);

    await mongoose.connect(
      `mongodb+srv://${user}:${pasword}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`);

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export { initMongoConnection };