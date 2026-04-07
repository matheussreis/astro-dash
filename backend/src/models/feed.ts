import type { Apod } from './apod.js';
import type { Neo } from './neo.js';

export interface FeedRegistry {
  apod: Apod | null;
  neo: Neo | null;
}

export interface Feed {
  date: Date;
  items: FeedRegistry;
}
