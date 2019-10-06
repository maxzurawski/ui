import {Action} from '@ngrx/store';
import {SensorAttribute} from '../../model/SensorAttribute';

export enum AttributesDialogActions {
  OpenDialogToAdd = '[AttributesDialogActions] open dialog to add',
  OpenDialogToUpdate = '[AttributesDialogActions] open dialog to update',
  UpdateSensorAttribute = '[AttributesDialogActions] update sensor attribute',
  CloseDialog = '[AttributesDialogActions] close dialog'
}

export class OpenDialogToAdd implements Action {
  readonly type = AttributesDialogActions.OpenDialogToAdd;
  constructor(public payload: {sensorAttributes: SensorAttribute[]}) {}
}

export class OpenDialogToUpdate implements Action {
  readonly type = AttributesDialogActions.OpenDialogToUpdate;
  constructor(public payload: {sensorAttribute: SensorAttribute, sensorsAttributes: SensorAttribute[]}) {}
}

export class UpdateSensorAttribute implements Action {
  readonly type = AttributesDialogActions.UpdateSensorAttribute;
  constructor(public payload: {sensorAttribute: SensorAttribute}) {}
}

export class CloseDialog implements Action {
  readonly type = AttributesDialogActions.CloseDialog;
}

export type AttributesDialogActionsUnion =
  OpenDialogToAdd | OpenDialogToUpdate | UpdateSensorAttribute | CloseDialog;
