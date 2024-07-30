import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    startServer();
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

bootstrap();
