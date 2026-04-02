import type { Request, Response } from 'express';

export default class FeedController {
  async get(req: Request, res: Response) {
    const date = req?.query.date ?? null;

    if (date === null) {
      return res.status(500).json({
        message: 'No Date Provided!',
      });
    }

    res.status(200).json({ date });
  }
}
