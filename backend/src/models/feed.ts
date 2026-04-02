import type { Apod } from './apod.js';
import type { Neo } from './neo.js';

export interface Feed {
  date: Date;
  apod: Apod;
  neo: Neo;
}
