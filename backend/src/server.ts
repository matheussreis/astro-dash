import 'dotenv/config';
import logger from './utils/logger.js';

async function start() {
  try {
    const { default: app } = await import('./app.js');
    const { serverConfig } = await import('./config/index.js');

    app.listen(serverConfig.port, () => {
      logger.info(`Server started on port: ${serverConfig.port}`);
    });
  } catch (error) {
    logger.error('Error starting server ->', error);
    process.exit(1);
  }
}

start();
