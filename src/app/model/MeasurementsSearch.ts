export interface MeasurementsSearch {
  uuid: string;
  processId: string;
  valueFrom: number;
  valueTo: number;
  reportedAtFrom: Date;
  reportedAtTo: Date;
  lastLimited: number;
  orderDesc: boolean;
}
