import * as fromSensorTypes from './sensortypes.reducer';
import * as fromAttributes from './attributes.reducer';

import {ActionReducerMap, createSelector} from '@ngrx/store';

export interface State {
  sensortypes: fromSensorTypes.SensortypesState;
  attributes: fromAttributes.AttributesState;
}

export const reducers: ActionReducerMap<State> = {
  sensortypes: fromSensorTypes.sensortypesReducer,
  attributes: fromAttributes.attributesReducer
};

// NOTE: SensortypesState and selectors
export const getSensortypesState = (state: State) => state.sensortypes;
export const getAllSensorTypes = createSelector(getSensortypesState, fromSensorTypes.getSensorTypeItems);
export const getSensorTypesLoaded = createSelector(getSensortypesState, fromSensorTypes.getHasLoaded);
export const getSingleSensorType = createSelector(getSensortypesState,
  (sensortypes, props) => sensortypes.sensortypes.find( obj => obj.id === props.id));

// NOTE: AttributesState and selectors
export const getAttributesState = (state: State) => state.attributes;
export const getAllAttributes = createSelector(getAttributesState, fromAttributes.getAttributes);
export const getAttributesLoaded = createSelector(getAttributesState, fromAttributes.getHasLoaded);
export const getSingleAttribute = createSelector(getAttributesState,
  (attributes, props) => attributes.items.find( obj => obj.symbol === props.symbol));
