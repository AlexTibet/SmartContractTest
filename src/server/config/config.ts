import { config } from 'dotenv';
import * as process from 'process';

config();

export default {
  contract: {
    address: process.env.CONTRACT_ADDRESS
  },
  provider: {
    id: process.env.PROVIDER_ID,
    secret: process.env.PROVIDER_SECRET,
    endpoints: {
      https: process.env.PROVIDER_HTTPS_ENDPOINT,
      wss: process.env.PROVIDER_WSS_ENDPOINTS
    }
  },
  dbLink: process.env.DB_LINK,
  auth: {
    jwt: {
      access: {
        secret: process.env.JWT_ACCESS_SECRET,
        lifetime: Number(process.env.JWT_ACCESS_LIFETIME)
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        lifetime: Number(process.env.JWT_REFRESH_LIFETIME)
      }
    }
  },
  server: {
    port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,
    host: process.env.SERVER_HOST ? process.env.SERVER_HOST : 'localhost',
    shutdownTimeout: process.env.SERVER_SHUTDOWN_TIMEOUT
      ? Number(process.env.SERVER_SHUTDOWN_TIMEOUT)
      : 15000
  },
  files: {
    allowedExtensions: /(jpg|png|jpeg)$/,
    maxFilesSize: 1024 * 1024 * 15, // in bytes
    maxFilesCount: 2,
    maxFileNameLength: 50
  },
  cors: {
    origins: process.env.CORS_ORIGINS ? JSON.parse(process.env.CORS_ORIGINS) : ['*'],
    methods: process.env.CORS_METHODS
      ? JSON.parse(process.env.CORS_METHODS)
      : ['POST, GET, OPTIONS'],
    headers: process.env.CORS_HEADERS
      ? JSON.parse(process.env.CORS_HEADERS)
      : ['Accept', 'Content-Type', 'Authorization'],
    maxAge: process.env.CORS_MAX_AGE ? Number(process.env.CORS_MAX_AGE) : 600,
    allowCredentials: process.env.CORS_ALLOW_CREDENTIALS
      ? process.env.CORS_ALLOW_CREDENTIALS
      : 'true',
    exposeHeaders: process.env.CORS_EXPOSE_HEADERS
      ? JSON.parse(process.env.CORS_EXPOSE_HEADERS)
      : ['content-type', 'content-length']
  }
};
