export interface UrlParserParams {
  baseUrl: string;
  pathSegments?: string[];
  queryParams?: Record<string, string>;
}

export interface UrlParser {
  parse(params: UrlParserParams): string;
}

export interface HttpClient {
  get<T>(url: string): Promise<T>;
}
