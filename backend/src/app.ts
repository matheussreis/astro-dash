import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { FeedRouter } from './routes/index.js';
import { limiter } from './middleware/rate-limit.js';
import { corsErrorHandler, corsMiddleware } from './middleware/cors.js';

const app = express();

app.set('trust proxy', 1);

app.use(limiter);

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(corsMiddleware);

app.use('/api/feed', FeedRouter);

app.use(corsErrorHandler);

export default app;
