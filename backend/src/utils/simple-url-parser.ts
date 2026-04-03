import type { UrlParser, UrlParserParams } from '../types/index.js';

export class SimpleUrlParser implements UrlParser {
  private removeExtraSlashes(path: string) {
    return path.replace(/^\/+|\/+$/g, '');
  }

  private cleanPath(path: string) {
    return this.removeExtraSlashes(path).trim();
  }

  private buildQueryString(queryParams: Record<string, string>) {
    return Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');
  }

  parse({ baseUrl, pathSegments, queryParams }: UrlParserParams): string {
    let url = this.cleanPath(baseUrl);

    if (pathSegments) {
      pathSegments = pathSegments.map((segment) => this.cleanPath(segment));
    }

    if (pathSegments && pathSegments.length > 0) {
      url += '/' + pathSegments.join('/');
    }

    if (queryParams && Object.keys(queryParams).length > 0) {
      const queryString = this.buildQueryString(queryParams);
      url = url.concat(`?${queryString}`);
    }

    return url;
  }
}
