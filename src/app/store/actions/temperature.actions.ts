import {Action} from "@ngrx/store";
import {MeasurementsSearch} from "../../model/MeasurementsSearch";
import {TemperatureMeasurement} from "../../model/TemperatureMeasurement";

export enum TemperatureSensorActions {
  LoadLastLimited = '[TemperatureSensor] load last limited',
  LoadLastLimitedSuccess = '[TemperatureSensor] load last limited success',
  LoadLastLimitedFailure = '[TemperatureSensor] load last limited failure',

  LoadSearchItems = '[TemperatureSensor] load search items',
  LoadSearchItemsSuccess = '[TemperatureSensor] load search items success',
  LoadSearchItemsFailure = '[TemperatureSensor] load search items failure',

  ResetFoundItems = '[TemperatureSensor] resetFoundItems'
}

export class LoadLastLimited implements Action {
  readonly type = TemperatureSensorActions.LoadLastLimited;
  constructor(public payload: {search: MeasurementsSearch}) {}
}

export class LoadLastLimitedSuccess implements Action {
  readonly type = TemperatureSensorActions.LoadLastLimitedSuccess;
  constructor(public payload: {data: Map<string, TemperatureMeasurement[]>}) {}
}

export class LoadLastLimitedFailure implements Action {
  readonly type = TemperatureSensorActions.LoadLastLimitedFailure;
  constructor(public payload: {error: any}) {}
}

export class LoadSearchItemsAction implements Action {
  readonly type = TemperatureSensorActions.LoadSearchItems;
  constructor(public payload: {search: MeasurementsSearch}) {}
}

export class LoadSearchItemsSuccessAction implements Action {
  readonly type = TemperatureSensorActions.LoadSearchItemsSuccess;
  constructor(public payload: {data: Map<string, TemperatureMeasurement[]>}) {}
}

export class LoadSearchItemsFailureAction implements Action {
  readonly type = TemperatureSensorActions.LoadSearchItemsFailure;
  constructor(public payload: {error: any}) {}
}

export class ResetFoundItemsAction implements Action {
  readonly type = TemperatureSensorActions.ResetFoundItems;
}

export type TemperatureSensorsActionsUnion =
  LoadLastLimited
  | LoadLastLimitedSuccess
  | LoadLastLimitedFailure
  | LoadSearchItemsAction
  | LoadSearchItemsSuccessAction
  | LoadSearchItemsFailureAction
  | ResetFoundItemsAction
