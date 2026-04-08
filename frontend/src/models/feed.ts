import type { Apod } from './apod';
import type { Neo } from './neo';

export interface FeedRegistry {
  apod: Apod | null;
  neo: Neo | null;
}

export interface Feed {
  date: Date;
  items: FeedRegistry;
}
