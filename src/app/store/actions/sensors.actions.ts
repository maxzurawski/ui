import {Action} from '@ngrx/store';
import {Sensor} from '../../model/Sensor';

export enum SensorsActions {
  LoadAllSensors = '[Sensors] load all',
  LoadAllSensorsSuccess = '[Sensors] load all success',
  LoadAllSensorsFailure = '[Sensors] load failure',
}

export class LoadAllSensors implements Action {
  readonly type = SensorsActions.LoadAllSensors;
}

export class LoadAllSensorsSuccess implements Action {
  readonly type = SensorsActions.LoadAllSensorsSuccess;
  constructor(public payload: {sensors: Sensor[]}) {}
}

export class LoadAllSensorsFailure implements Action {
  readonly type = SensorsActions.LoadAllSensorsFailure;
  constructor(public payload: {error: any}) {}
}


export type SensorsActionsUnion =
  LoadAllSensors
  | LoadAllSensorsSuccess
  | LoadAllSensorsFailure;
