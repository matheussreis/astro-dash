import logger from '../utils/logger.js';
import rateLimit from 'express-rate-limit';
import type { Request, Response } from 'express';

const TIME_WINDOW_IN_MINUTES = 30;

const TIME_WINDOW_IN_MILLISECONDS = TIME_WINDOW_IN_MINUTES * 60 * 1000;

const REQUESTS_PER_TIME_WINDOW = 100;

const ALLOW_X_RATE_LIMIT_HEADER = false;

const STANDARD_RATE_LIMIT_HEADERS = 'draft-8';

const IPV6_SUBNET_CHECK_RANGE = 56;

const MESSAGE = `Too many requests, please try again in ${TIME_WINDOW_IN_MINUTES} minutes.`;

const rateLimitHandler = (req: Request, res: Response) => {
  logger.error(`Rate limit hit for IP: ${req.ip}.`);
  res.status(429).json({ message: MESSAGE });
};

export const limiter = rateLimit({
  windowMs: TIME_WINDOW_IN_MILLISECONDS,
  limit: REQUESTS_PER_TIME_WINDOW,
  standardHeaders: STANDARD_RATE_LIMIT_HEADERS,
  legacyHeaders: ALLOW_X_RATE_LIMIT_HEADER,
  ipv6Subnet: IPV6_SUBNET_CHECK_RANGE,
  handler: rateLimitHandler,
});
