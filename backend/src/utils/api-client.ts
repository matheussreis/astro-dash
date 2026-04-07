import logger from './logger.js';
import type { HttpClient } from '../types/index.js';

export class ApiClient implements HttpClient {
  private readonly TIMEOUT_MILLISECONDS = 10_000;

  private async fetch(url: string): Promise<Response> {
    try {
      return await fetch(url, {
        signal: AbortSignal.timeout(this.TIMEOUT_MILLISECONDS),
      });
    } catch (err: unknown) {
      throw this.handleFetchError(err, url);
    }
  }

  private handleFetchError(err: unknown, url: string): Error {
    if (err instanceof Error && err.name === 'TimeoutError') {
      logger.error(
        `Request timed out after ${this.TIMEOUT_MILLISECONDS}ms: ${url}`,
      );
      return new Error('Request timed out', { cause: err });
    }

    return err as Error;
  }

  private handleResponseError(response: Response): never {
    logger.error(
      `Request failed: ${response.statusText} (status: ${response.status})`,
    );

    throw new Error(response.statusText, { cause: response.status });
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.fetch(url);

    if (!response.ok) {
      this.handleResponseError(response);
    }

    return response.json() as Promise<T>;
  }
}
