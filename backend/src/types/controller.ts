import type { Request, Response } from 'express';

export interface Controller<T> {
  get(req: Request, res: Response<T>): Promise<void>;
}
