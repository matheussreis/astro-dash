import logger from '../utils/logger.js';
import type { ApiService } from '../types/index.js';
import type { Apod, Feed, Neo } from '../models/index.js';

export class FeedService implements ApiService<Feed> {
  constructor(private services: ApiService[] = []) {}

  async retrieve(date: string) {
    logger.info(`Retrieving feed data for date: ${date}`);

    const results = await Promise.allSettled(
      this.services.map((service) => service.retrieve(date)),
    );

    const [apod, neo] = results.map((result) => {
      if (result.status === 'rejected') {
        logger.error('Service failed:', result.reason);
        return null;
      }

      return result.value;
    });

    logger.info(`Feed data retrieved for date: ${date}`);

    return {
      date: new Date(date),
      items: {
        apod: apod as Apod | null,
        neo: neo as Neo | null,
      },
    };
  }
}
