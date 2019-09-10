import * as fromActions from '../actions/index';
import {SensorType} from '../../model/SensorType';

export interface SensortypesState {
  sensortypes: SensorType[];
  hasLoaded: boolean;
}

export const initialSensortypesState: SensortypesState = {
  sensortypes: [],
  hasLoaded: false
};

export function sensortypesReducer(
  state = initialSensortypesState,
  action: fromActions.SensorTypesUnions
): SensortypesState {

  switch (action.type) {
    case fromActions.SensorTypesActions.LoadSensorTypesSuccessful: {
      return {
        ...state,
        sensortypes: action.payload.sensortypes,
        hasLoaded: true
      };
    }

    case fromActions.SensorTypesActions.UpdateSensorTypeSuccessful: {
      const payload = action.payload.sensortype;
      const copyItems = state.sensortypes;
      copyItems.forEach((item, i) => {
        if (item.id === payload.id) {
          copyItems[i] = payload;
        }
      });
      return {
        ...state,
        sensortypes: copyItems,
        hasLoaded: true
      };
    }

    case fromActions.SensorTypesActions.DeleteSensorTypeSuccessful: {
      const id = action.payload.id;
      const copyItems = state.sensortypes;
      const filtered = copyItems.filter(item => item.id !== id);
      return {
        ...state,
        sensortypes: filtered,
        hasLoaded: true
      };
    }

    case fromActions.SensorTypesActions.SaveSensorTypeSuccessful: {
      let sensors = state.sensortypes;
      if (!sensors) {
        sensors = new Array();
      }
      const sensorType = action.payload.sensorType as SensorType;
      sensors.push(sensorType);
      return {
        ...state,
        sensortypes: sensors,
        hasLoaded: true
      };
    }

    default:
      return state;
  }
}

export const getSensorTypeItems = (state: SensortypesState) => state.sensortypes;
export const getHasLoaded = (state: SensortypesState) => state.hasLoaded;
