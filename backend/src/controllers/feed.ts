import type { Request, Response } from 'express';
import type { Validator } from '../types/index.js';

export default class FeedController {
  constructor(private validator: Validator) {}

  async get(req: Request, res: Response) {
    const date = req?.query.date ?? null;

    const result = this.validator.validate({ date });

    if (!result.valid) {
      return res.status(result.code).json({
        message: result.message,
      });
    }

    res.status(200).json({ date });
  }
}
