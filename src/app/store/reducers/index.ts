import * as fromSensorTypes from './sensortypes.reducer';

import {ActionReducerMap, createSelector} from '@ngrx/store';

export interface State {
  sensortypes: fromSensorTypes.SensortypesState;
}

export const reducers: ActionReducerMap<State> = {
  sensortypes: fromSensorTypes.sensortypesReducer,
};

// NOTE: SensortypesState and selectors
export const getSensortypesState = (state: State) => state.sensortypes;
export const getAllSensorTypes = createSelector(getSensortypesState, fromSensorTypes.getSensorTypeItems);
export const getSensorTypesLoaded = createSelector(getSensortypesState, fromSensorTypes.getHasLoaded);
export const getSingleSensorType = createSelector(getSensortypesState,
  (sensortypes, props) => sensortypes.sensortypes.find( obj => obj.id === props.id));
