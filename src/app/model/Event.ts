export interface Event {
  id: number;
  processId: string;
  sensorUuid: string;
  topic: string;
  routingKey: string;
  cache: string;
  max: string;
  min: string;
  service: string;
  value: string;
  logMsg: string;
  errorMsg: string;
  errorDetails: string;
  previous: string;
  current: string;
  publishedOn: Date;
}
