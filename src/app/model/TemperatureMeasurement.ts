export interface TemperatureMeasurement {
  id: number;
  uuid: string;
  processId: string;
  value: number;
  reportedAt: Date;
  receivedAt: Date;
}
