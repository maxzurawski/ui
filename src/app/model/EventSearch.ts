export interface EventsSearch {
  processId: string;
  topic: string;
  routingKey: string;
  sensorsUuid: string;
  errorMsg: string;
  service: string;
  publishedOnFrom: Date;
  publishedOnTo: Date;
}
