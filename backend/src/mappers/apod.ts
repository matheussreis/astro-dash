import type { Apod } from '../models/index.js';
import type { DataMapper } from '../types/index.js';

export class ApodMapper implements DataMapper<Apod> {
  mapTo(data: any): Apod {
    const { date, title, explanation, url } = data;

    if (!date || !title || !explanation || !url) {
      throw new Error('Invalid APOD response structure');
    }

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime()) || dateObj > new Date()) {
      throw new Error('Invalid APOD date');
    }

    return {
      date: dateObj,
      title: title,
      description: explanation,
      cover: url,
    };
  }
}
