export interface ApiService<T = any, P = void> {
  retrieve(params: P): Promise<T>;
}
