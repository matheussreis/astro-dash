import type {
  ApiService,
  DataMapper,
  NasaConfig,
  UrlParser,
} from '../types/index.js';
import type { Neo } from '../models/index.js';
import logger from '../utils/logger.js';

export class NeoService implements ApiService<Neo> {
  constructor(
    private config: NasaConfig,
    private urlParser: UrlParser,
    private mapper: DataMapper<Neo>,
  ) {}

  async retrieve(date: string): Promise<Neo> {
    logger.info(`Retrieving NEO data for date: ${date}`);

    const url = this.urlParser.parse({
      baseUrl: this.config.baseUrl,
      pathSegments: [this.config.endpoint],
      queryParams: {
        api_key: this.config.apiKey!,
        start_date: date,
        end_date: date,
      },
    });

    const response = await fetch(url);

    if (!response.ok) {
      logger.error(
        `NEO API request failed: ${response.statusText} (status: ${response.status})`,
      );

      throw new Error(response.statusText, { cause: response.status });
    }

    logger.info(`NEO API request successful for date: ${date}`);

    const data = await response.json();
    const neoItems = data.near_earth_objects[date];
    if (!Array.isArray(neoItems)) {
      const message = `No NEO data found for date: ${date}`;
      logger.info(message);
      throw new Error(message);
    }

    return this.mapper.mapTo(neoItems);
  }
}
