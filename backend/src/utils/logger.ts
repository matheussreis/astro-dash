import winston from 'winston';
import 'winston-daily-rotate-file';

const customFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level} : ${message}`;
});

const transports: winston.transport[] = [new winston.transports.Console()];

if (!process.env.VERCEL) {
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
    }),
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat,
  ),
  transports,
});

export default logger;
