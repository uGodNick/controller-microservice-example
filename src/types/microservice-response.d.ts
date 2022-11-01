export interface MicroserviceResponse<T> {
  data: T | null;
  error: string | null;
}
