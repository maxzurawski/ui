import {Action} from "@ngrx/store";
import {CachedSensor} from "../../model/CachedSensor";

export enum CachedSensorsActions {
  LoadCachedSensors = '[CachedSensors] load all',
  LoadCachedSensorsFailure = '[CachedSensors] load failed',
  LoadCachedSensorsSuccess = '[CachedSensors] load success'
}

export class LoadCachedSensors implements Action {
  readonly type = CachedSensorsActions.LoadCachedSensors
}

export class LoadCachedSensorsFailure implements Action {
  readonly type = CachedSensorsActions.LoadCachedSensorsFailure;
  constructor(public payload: {error: any}) {}
}

export class LoadCachedSensorsSuccess implements Action {
  readonly type = CachedSensorsActions.LoadCachedSensorsSuccess;
  constructor(public payload: {cachedSensors: CachedSensor[]}) {}
}

export type CachedSensorsActionsUnion =
    LoadCachedSensors
  | LoadCachedSensorsFailure
  | LoadCachedSensorsSuccess;
