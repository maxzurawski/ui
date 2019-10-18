import {SensortypesEffects} from './sensortypes.effects';
import {AttributesEffects} from './attributes.effects';
import {SensorsEffects} from "./sensors.effects";
import {CachedsensorsEffects} from './cachedsensors.effects';
import {TemperatureEffects} from './temperature.effects';

export const effects: any[] = [
  SensortypesEffects,
  AttributesEffects,
  SensorsEffects,
  CachedsensorsEffects,
  TemperatureEffects];
