import { ApiClient } from './api-client.js';
import { FeedValidator } from '../validators/index.js';
import { FeedController } from '../controllers/index.js';
import { SimpleUrlParser } from './simple-url-parser.js';
import { apodConfig, neoConfig } from '../config/index.js';
import { ApodMapper, NeoMapper } from '../mappers/index.js';
import { ApodService, NeoService, FeedService } from '../services/index.js';

export function makeFeedValidator() {
  return new FeedValidator();
}

export function makeUrlParser() {
  return new SimpleUrlParser();
}

export function makeApodMapper() {
  return new ApodMapper();
}

export function makeNeoMapper() {
  return new NeoMapper();
}

export function makeApiClient() {
  return new ApiClient();
}

export function makeApodService() {
  const urlParser = makeUrlParser();
  const dataMapper = makeApodMapper();
  const apiClient = makeApiClient();
  return new ApodService(apodConfig, urlParser, dataMapper, apiClient);
}

export function makeNeoService() {
  const urlParser = makeUrlParser();
  const dataMapper = makeNeoMapper();
  const apiClient = makeApiClient();
  return new NeoService(neoConfig, urlParser, dataMapper, apiClient);
}

export function makeFeedService() {
  const apodService = makeApodService();
  const neoService = makeNeoService();
  return new FeedService([apodService, neoService]);
}

export function makeFeedController() {
  const validator = makeFeedValidator();
  const service = makeFeedService();
  return new FeedController(validator, service);
}
