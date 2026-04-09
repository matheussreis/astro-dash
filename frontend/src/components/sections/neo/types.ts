export type KpiDataFormat = 'velocityInKmH' | 'hazardousHighlight';

export interface KpiDataItem {
  label: string;
  value: number | string;
  format?: KpiDataFormat;
}
