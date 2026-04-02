import express from 'express';
import { makeFeedController } from '../utils/factories.js';

const router = express.Router();

const controller = makeFeedController();

router.get('/', controller.get);

export default router;
