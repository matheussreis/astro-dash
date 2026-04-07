import type {
  ApiService,
  DataMapper,
  NasaConfig,
  UrlParser,
} from '../types/index.js';
import type { Neo } from '../models/index.js';

export class NeoService implements ApiService<Neo> {
  constructor(
    private config: NasaConfig,
    private urlParser: UrlParser,
    private mapper: DataMapper<Neo>,
  ) {}

  async retrieve(date: string): Promise<Neo> {
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
      throw new Error(response.statusText, { cause: response.status });
    }

    const data = await response.json();

    const neoItems = data.near_earth_objects[date];
    if (!Array.isArray(neoItems)) {
      throw new Error(`No NEO data found for date: ${date}`);
    }

    return this.mapper.mapTo(neoItems);
  }
}
