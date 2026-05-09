const http = require('http');
const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info(`Expense Tracker API running on port ${config.port}`);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  server.close(() => process.exit(1));
});
