import type {
  ApiService,
  DataMapper,
  HttpClient,
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
    private apiClient: HttpClient,
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

    const data = await this.apiClient.get<Apod>(url);

    return this.mapper.mapTo(data);
  }
}
