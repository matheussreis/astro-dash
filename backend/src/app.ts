import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { FeedRouter } from './routes/index.js';
import { clientConfig } from './config/index.js';
import { limiter } from './utils/rate-limit.js';

const app = express();

app.set('trust proxy', 1);

app.use(limiter);

app.use(helmet());

app.use(express.json());

app.use(cors({ origin: clientConfig.url }));

app.use('/api/feed', FeedRouter);

export default app;
