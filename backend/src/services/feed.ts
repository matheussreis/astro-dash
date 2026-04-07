import type { Apod, Feed, Neo } from '../models/index.js';
import type { ApiService } from '../types/index.js';

export class FeedService implements ApiService<Feed> {
  constructor(private services: ApiService[] = []) {}

  async retrieve(date: string) {
    const results = await Promise.allSettled(
      this.services.map((service) => service.retrieve(date)),
    );

    const [apod, neo] = results.map((result) => {
      if (result.status === 'rejected') {
        console.error('Service failed:', result.reason);
        return null;
      }

      return result.value;
    });

    return {
      date: new Date(date),
      items: {
        apod: apod as Apod | null,
        neo: neo as Neo | null,
      },
    };
  }
}
