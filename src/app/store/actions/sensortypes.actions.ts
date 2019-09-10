import {Action} from '@ngrx/store';
import {SensorType} from '../../model/SensorType';

export enum SensorTypesActions {
  LoadSensorTypesBegin = '[SensorTypes] load begin',
  LoadSensorTypesSuccessful = '[SensorTypes] load successful',
  LoadSensorTypesFailure = '[SensorTypes] load failure',

  UpdateSensorType = '[SensorTypes] update begin',
  UpdateSensorTypeSuccessful = '[SensorTypes] update successful',
  UpdateSensorTypeFailure = '[SensorTypes] update failure',

  DeleteSensorType = '[SensorTypes] delete begin',
  DeleteSensorTypeSuccessful = '[SensorTypes] delete successful',
  DeleteSensorTypeFailure = '[SensorType] delete failure',

  SaveSensorType = '[SensorType] save begin',
  SaveSensorTypeSuccessful = '[SensorType] save successful',
  SaveSensorTypeFailure = '[SensorType] save failure'
}

export class LoadSensorTypesBegin implements Action {
  readonly type = SensorTypesActions.LoadSensorTypesBegin;
}

export class LoadSensorTypesSuccessful implements Action {
  readonly type = SensorTypesActions.LoadSensorTypesSuccessful;
  constructor(public payload: {sensortypes: SensorType[]}) {}
}

export class LoadSensorTypesFailure implements Action {
  readonly type = SensorTypesActions.LoadSensorTypesFailure;
  constructor(public payload: {error: any}) {}
}

export class UpdateSensorType implements Action {
  readonly type = SensorTypesActions.UpdateSensorType;
  constructor(public payload: {sensorType: SensorType}) {}
}

export class UpdateSensorTypeSuccessful implements Action {
  readonly type = SensorTypesActions.UpdateSensorTypeSuccessful;
  constructor(public payload: {sensortype: SensorType}) {}
}

export class UpdateSensorTypeFailure implements Action {
  readonly type = SensorTypesActions.UpdateSensorTypeFailure;
  constructor(public payload: {error: any}) {}
}

export class DeleteSensorType implements Action {
  readonly type = SensorTypesActions.DeleteSensorType;
  constructor(public payload: {id: number}) {}
}

export class DeleteSensorTypeSuccessful implements Action {
  readonly type = SensorTypesActions.DeleteSensorTypeSuccessful;
  constructor(public payload: {id: number}) {}
}

export class DeleteSensorTypeFailure implements Action {
  readonly type = SensorTypesActions.DeleteSensorTypeFailure;
  constructor(public payload: {error: any}) {}
}

export class SaveSensorType implements Action {
  readonly type = SensorTypesActions.SaveSensorType;
  constructor(public payload: {sensorType: SensorType}) {}
}

export class SaveSensorTypeSuccessful implements Action {
  readonly type = SensorTypesActions.SaveSensorTypeSuccessful;
  constructor(public payload: {sensorType: SensorType}) {}
}

export class SaveSensorTypeFailure implements Action {
  readonly type = SensorTypesActions.SaveSensorTypeFailure;
  constructor(public payload: {error: any}) {}
}

export type SensorTypesUnions =
  LoadSensorTypesBegin
  | LoadSensorTypesSuccessful
  | LoadSensorTypesFailure
  | UpdateSensorType
  | UpdateSensorTypeSuccessful
  | UpdateSensorTypeFailure
  | DeleteSensorType
  | DeleteSensorTypeSuccessful
  | DeleteSensorTypeFailure
  | SaveSensorType
  | SaveSensorTypeSuccessful
  | SaveSensorTypeFailure;
