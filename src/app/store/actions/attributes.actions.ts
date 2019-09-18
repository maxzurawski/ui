import {Action} from '@ngrx/store';
import {AttributeDictionary} from '../../model/AttributeDictionary';

export enum AttributeDictionaryActions {
  LoadAttributesBegin = '[AttributeDictionary] load begin',
  LoadAttributesSuccessful = '[AttributeDictionary] loading successful',
  LoadAttributesFailure = '[AttributeDictionary] loading failure',

  UpdateAttribute = '[AttributeDictionary] update attribute',
  UpdateAttributeSuccessful = '[AttributeDictionary] update attribute successful',
  UpdateAttributeFailure = '[AttributeDictionary] update failed'
}

export class LoadAttributesBegin implements Action {
  readonly type = AttributeDictionaryActions.LoadAttributesBegin;
}

export class LoadAttributesSuccessful implements Action {
  readonly type = AttributeDictionaryActions.LoadAttributesSuccessful;
  constructor(public payload: {data: AttributeDictionary[]}) {}
}

export class LoadAttributesFailure implements Action {
  readonly type = AttributeDictionaryActions.LoadAttributesFailure;
  constructor(public payload: {error: any}) {}
}

export class UpdateAttribute implements Action {
  readonly type = AttributeDictionaryActions.UpdateAttribute;
  constructor(public payload: {data: AttributeDictionary}) {}
}

export class UpdateAttributeSuccessful implements Action {
  readonly type = AttributeDictionaryActions.UpdateAttributeSuccessful;
  constructor(public payload: {data: AttributeDictionary}) {}
}

export class UpdateAttributeFailed implements Action {
  readonly type = AttributeDictionaryActions.UpdateAttributeFailure;
  constructor(public payload: {error: any}) {}
}

export type AttributeUnions = LoadAttributesBegin
  | LoadAttributesSuccessful
  | LoadAttributesFailure
  | UpdateAttribute
  | UpdateAttributeSuccessful
  | UpdateAttributeFailed;
