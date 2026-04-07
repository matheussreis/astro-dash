import type {
  ApiService,
  DataMapper,
  NasaConfig,
  UrlParser,
} from '../types/index.js';
import type { Apod } from '../models/index.js';

export class ApodService implements ApiService<Apod> {
  constructor(
    private config: NasaConfig,
    private urlParser: UrlParser,
    private mapper: DataMapper<Apod>,
  ) {}

  async retrieve(date: string): Promise<Apod> {
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
      throw new Error(response.statusText, { cause: response.status });
    }

    const data = await response.json();

    return this.mapper.mapTo(data);
  }
}
