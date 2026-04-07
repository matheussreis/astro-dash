import cors from 'cors';
import logger from '../utils/logger.js';
import { clientConfig } from '../config/index.js';
import type { NextFunction, Request, Response } from 'express';

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (origin === clientConfig.url) {
      callback(null, true);
      return;
    }

    logger.error(`Rejected by CORS with origin: ${origin}`);
    callback(new Error('Blocked by CORS.'), false);
  },
});

export const corsErrorHandler = (
  error: any,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error?.message === 'Blocked by CORS.') {
    return res.status(403).json({ message: 'Blocked by CORS' });
  }

  next(error);
};
