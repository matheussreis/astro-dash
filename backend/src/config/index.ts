import type { ClientConfig, NasaConfig } from '../types/index.js';

const nasaBaseURL = process.env.NASA_BASE_URL!;
const nasaApiKey = process.env.NASA_API_KEY!;
const clientURL = process.env.CLIENT_URL!;

const baseNasaConfig = {
  baseUrl: nasaBaseURL,
  apiKey: nasaApiKey,
};

export const apodConfig: NasaConfig = {
  ...baseNasaConfig,
  endpoint: process.env.NASA_APOD_ENDPOINT!,
};

export const neoConfig: NasaConfig = {
  ...baseNasaConfig,
  endpoint: process.env.NASA_NEO_ENDPOINT!,
};

export const clientConfig: ClientConfig = {
  url: clientURL,
};
