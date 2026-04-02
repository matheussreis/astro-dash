import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { FeedRouter } from './routes/index.js';

dotenv.config();

const app = express();

app.use(helmet());

app.use(express.json());

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use('/api/feed', FeedRouter);

export default app;
