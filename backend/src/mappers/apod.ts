import type { Apod } from '../models/index.js';
import type { DataMapper } from '../types/index.js';

export class ApodMapper implements DataMapper<Apod> {
  mapTo(data: any): Apod {
    const { title, explanation, url } = data;

    if (!title || !explanation || !url) {
      throw new Error('Invalid APOD response structure');
    }

    return {
      title: title,
      description: explanation,
      cover: url,
    };
  }
}
