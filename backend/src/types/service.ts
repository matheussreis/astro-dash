export interface ApiService<T = any> {
  retrieve(...args: any[]): Promise<T>;
}
