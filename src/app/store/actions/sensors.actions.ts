import {Action} from '@ngrx/store';
import {Sensor} from '../../model/Sensor';
import {ComponentsMode} from "../../crosscutting/componentsMode";

export enum SensorsActions {
  LoadAllSensors = '[Sensors] load all',
  LoadAllSensorsSuccess = '[Sensors] load all success',
  LoadAllSensorsFailure = '[Sensors] load failure',

  LoadSingleSensor = '[Sensors] load single sensor',
  LoadSingleSensorSuccess = '[Sensor] load single sensor success',
  LoadSingleSensorFailure = '[Sensor] load single sensor failure',

  DeleteSensor = '[Sensors] delete sensor',
  DeleteSensorSuccess = '[Sensor] delete sensor success',
  DeleteSensorFailure = '[Sensor] delete sensor failure',

  UpdateSensor = '[Sensor] update sensor begin',
  UpdateSensorSuccess = '[Sensor] update sensor load',
  UpdateSensorFailure = '[Sensor] update sensor failure',

  SaveSensor = '[Sensor] save sensor begin',
  SaveSensorSuccess = '[Sensor] save sensor success',
  SaveSensorFailure = '[Sensor] save sensor failure',

  UpdateDetailsMode = '[Sensor] update sensor mode'
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

export class LoadSingleSensor implements Action {
  readonly type = SensorsActions.LoadSingleSensor;
  constructor(public payload: {id: number}) {}
}

export class LoadSingleSensorSuccess implements Action {
  readonly type = SensorsActions.LoadSingleSensorSuccess;
  constructor(public payload: {sensor: Sensor}) {}
}

export class LoadSingleSensorFailure implements Action {
  readonly type = SensorsActions.LoadSingleSensorFailure;
  constructor(public payload: {error: any}) {}
}

export class DeleteSensor implements Action {
  readonly type = SensorsActions.DeleteSensor;
  constructor(public payload: {uuid: string}) {}
}

export class DeleteSensorSuccess implements Action {
  readonly type = SensorsActions.DeleteSensorSuccess;
  constructor(public payload: {uuid: string}) {}
}

export class DeleteSensorFailure implements Action {
  readonly type = SensorsActions.DeleteSensorFailure;
  constructor(public payload: {error: any}) {}
}

export class UpdateSensor implements Action {
  readonly type = SensorsActions.UpdateSensor;
  constructor(public payload: {sensor: Sensor}) {}
}

export class UpdateSensorSuccess implements Action {
  readonly type = SensorsActions.UpdateSensorSuccess;
  constructor(public payload: {sensor: Sensor}) {}
}

export class UpdateSensorFailure implements Action {
  readonly type = SensorsActions.UpdateSensorFailure;
  constructor(public payload: {error: any}) {}
}

export class SaveSensor implements Action {
  readonly type = SensorsActions.SaveSensor;
  constructor(public payload: {sensor: Sensor}) {}
}

export class SaveSensorSuccess implements Action {
  readonly type = SensorsActions.SaveSensorSuccess;
  constructor(public payload: {sensor: Sensor}) {}
}

export class SaveSensorFailure implements Action {
  readonly type = SensorsActions.SaveSensorFailure;
  constructor(public payload: {error: any}) {}
}

export class UpdateDetailsMode implements Action {
  readonly type = SensorsActions.UpdateDetailsMode;
  constructor(public payload: {mode: ComponentsMode}) {}
}

export type SensorsActionsUnion =
  LoadAllSensors
  | LoadAllSensorsSuccess
  | LoadAllSensorsFailure
  | LoadSingleSensor
  | LoadSingleSensorSuccess
  | LoadSingleSensorFailure
  | DeleteSensor
  | DeleteSensorSuccess
  | DeleteSensorFailure
  | UpdateSensor
  | UpdateSensorSuccess
  | UpdateSensorFailure
  | SaveSensor
  | SaveSensorSuccess
  | SaveSensorFailure
  | UpdateDetailsMode;
