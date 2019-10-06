import * as fromSensorTypes from './sensortypes.reducer';
import * as fromAttributes from './attributes.reducer';
import * as fromSensors from './sensors.reducer';
import * as fromAttributesDialog from './attributesdialog.reducer';


import {ActionReducerMap, createSelector} from '@ngrx/store';

export interface State {
  sensortypes: fromSensorTypes.SensortypesState;
  attributes: fromAttributes.AttributesState;
  sensors: fromSensors.SensorsState;
  sensorsAttributesDialog: fromAttributesDialog.AttributesDialogState;
}

export const reducers: ActionReducerMap<State> = {
  sensortypes: fromSensorTypes.sensortypesReducer,
  attributes: fromAttributes.attributesReducer,
  sensors: fromSensors.sensorsReducer,
  sensorsAttributesDialog: fromAttributesDialog.attributesDialogReducer,
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

// NOTE: SensorsState and selectors
export const getSensorsState = (state: State) => state.sensors;
export const getAllSensors = createSelector(getSensorsState, fromSensors.getAllItems);
export const getSensorsLoaded = createSelector(getSensorsState, fromSensors.getHasLoaded);
export const getAmountOfSensorsWhichUseSensorType = createSelector(getSensorsState,
  (sensors, props) => {
    if (sensors !== undefined || sensors.items !== undefined || sensors.items !== null || sensors.items.length !== 0) {
      return sensors.items.filter(obj => obj.type === props.sensortype).length;
    }
    return 0;
  });
export const getSingleSensor = createSelector(getSensorsState,
  (sensors, props) => sensors.items.find(obj => obj.id === props.id));
export const getUuids = createSelector(getSensorsState, fromSensors.getUuids);
export const getSensorDetailsMode = createSelector(getSensorsState, fromSensors.getSensorDetailsMode);

// SensorAttributes dialog
export const getSensorAttributesDialogState = (state: State) => state.sensorsAttributesDialog;
export const getAttributesDialogOpened = createSelector(getSensorAttributesDialogState, fromAttributesDialog.getAttributesDialogOpened);
export const getSensorsAttributes = createSelector(getSensorAttributesDialogState, fromAttributesDialog.getSensorsAttributes);
export const getAttributesDialogMode = createSelector(getSensorAttributesDialogState, fromAttributesDialog.getAttributesDialogMode);
export const getSensorAttribute = createSelector(getSensorAttributesDialogState, fromAttributesDialog.getSensorAttribute);
export const getSensorAttributeAfterUpdate = createSelector(getSensorAttributesDialogState,
  fromAttributesDialog.getSensorAttributeAfterUpdate);
