import {SensorAttribute} from './SensorAttribute';
import {SensorType} from './SensorType';

export interface Sensor {
  id: number;
  version: number;
  name: string;
  uuid: string;
  type: string;
  sensorType: SensorType;
  description: string;
  attributes: SensorAttribute[];
}

export function compareByType(sensorA, sensorB) {
  if (sensorA.type < sensorB.type) {
    return -1;
  }
  if (sensorA.type > sensorB.type) {
    return 1;
  }
  return 0;
}
