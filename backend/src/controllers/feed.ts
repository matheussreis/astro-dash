import type { Feed } from '../models/index.js';
import type { Request, Response } from 'express';
import type { ApiService, Controller, Validator } from '../types/index.js';

export class FeedController implements Controller<Feed> {
  constructor(
    private validator: Validator,
    private service: ApiService<Feed>,
  ) {}

  async get(req: Request, res: Response) {
    try {
      const date = req?.query.date ?? null;

      const result = this.validator.validate({ date });

      if (!result.valid) {
        res.status(result.code).json({
          message: result.message,
        });

        return;
      }

      const feed = await this.service.retrieve(date);

      res.status(200).json({ feed });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving feed data',
      });
    }
  }
}
