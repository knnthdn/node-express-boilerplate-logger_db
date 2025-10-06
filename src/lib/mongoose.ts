/**
 * Node modules
 */

import mongoose from 'mongoose';

/**
 * Custom modules
 */

import config from '../config/index';
import { logger } from '../lib/winston';

/**
 * Types
 */

import { ConnectOptions } from 'mongoose';

const clientOptions: ConnectOptions = {
  dbName: 'App DB',
  appName: 'App API',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * If an error occurs during the connection process, it throws an error with a descriptive message.
 *
 * - Uses 'MONGO_URI' as the connection string.
 * - 'clientOptions' contains additional configuration for Mongoose.
 * - Error are properly handled and rethrown for better debugging
 */

export const connecToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error('MongoDB URI is not defined in the configuration.');
  }

  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);

    logger.info('Connected to MongoDB', clientOptions);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    logger.error('Error connecting to database', error);
  }
};

/**
 * Disconnect  from the MongoDB database using Mongoose
 *
 * This function attempts to disconnect from the database asynchronously.
 * If the disconnection is successful, a success message will logged.
 * If an error occurs, it is either re-thrown as a new Error (if its instance of Error) or logged to the console.
 */

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();

    logger.info('Disconnected from database successfully', clientOptions);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    logger.error('Error disconnecting from database.', error);
  }
};
