import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExist.js';
import { TMP_UPLOAD_DIR, UPLOAD_AVATAR_DIR } from './constants/constants.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_AVATAR_DIR);
    startServer();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

bootstrap();
