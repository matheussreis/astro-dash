import type {
  ApiService,
  DataMapper,
  NasaConfig,
  UrlParser,
} from '../types/index.js';
import type { Apod } from '../models/index.js';
import logger from '../utils/logger.js';

export class ApodService implements ApiService<Apod> {
  constructor(
    private config: NasaConfig,
    private urlParser: UrlParser,
    private mapper: DataMapper<Apod>,
  ) {}

  async retrieve(date: string): Promise<Apod> {
    logger.info(`Retrieving APOD data for date: ${date}`);

    const url = this.urlParser.parse({
      baseUrl: this.config.baseUrl,
      pathSegments: [this.config.endpoint],
      queryParams: {
        api_key: this.config.apiKey!,
        date,
      },
    });

    const response = await fetch(url);

    if (!response.ok) {
      logger.error(
        `APOD API request failed: ${response.statusText} (status: ${response.status})`,
      );

      throw new Error(response.statusText, { cause: response.status });
    }

    logger.info(`APOD API request successful for date: ${date}`);

    const data = await response.json();

    return this.mapper.mapTo(data);
  }
}
