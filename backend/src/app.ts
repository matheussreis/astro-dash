import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { FeedRouter } from './routes/index.js';
import { clientConfig } from './config/index.js';

const app = express();

app.use(helmet());

app.use(express.json());

app.use(cors({ origin: clientConfig.url }));

app.use('/api/feed', FeedRouter);

export default app;
