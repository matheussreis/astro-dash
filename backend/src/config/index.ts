import type { ClientConfig, NasaConfig, ServerConfig } from '../types/index.js';

function requireEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required env variable: ${key}`);
  }

  return value;
}

const baseNasaConfig = {
  baseUrl: requireEnv('NASA_BASE_URL'),
  apiKey: requireEnv('NASA_API_KEY'),
};

export const apodConfig: NasaConfig = {
  ...baseNasaConfig,
  endpoint: requireEnv('NASA_APOD_ENDPOINT'),
};

export const neoConfig: NasaConfig = {
  ...baseNasaConfig,
  endpoint: requireEnv('NASA_NEO_ENDPOINT'),
};

export const clientConfig: ClientConfig = {
  url: requireEnv('CLIENT_URL'),
};

export const serverConfig: ServerConfig = {
  port: requireEnv('PORT'),
};
