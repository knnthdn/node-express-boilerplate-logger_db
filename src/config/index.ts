import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
  quiet: true,
});

const config = {
  PORT: process.env.PORT || 8000, //port
  NODE_ENV: process.env.NODE_ENV, //node environment
  //allowed domain for CORS
  WHITELIST_ORIGIN: (process.env.ALLOWED_DOMAIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  MONGO_URI: process.env.MONGO_URI, //mongodb uri
  LOG_LEVEL: process.env.LOG_LEVEL || 'info', //for setting winston log level
  LOG_TYPE: process.env.LOG_TYPE || 'json', //for setting winston log type (json || custom)
};

export default config;
