import {TemperatureMeasurement} from "../../model/TemperatureMeasurement";
import * as fromActions from '../actions/index';
import {CachedSensorsState} from "./cachedsensors.reducer";

export interface TemperatureSensorState {
  lastFindItems: Map<string, TemperatureMeasurement[]>;
  foundItems: Map<string, TemperatureMeasurement[]>;
  loaded: boolean;
}

export const initialState: TemperatureSensorState = {
  lastFindItems: new Map<string, TemperatureMeasurement[]>(),
  foundItems: new Map<string, TemperatureMeasurement[]>(),
  loaded: false
};

export function temperatureSensorReducer(
  state = initialState,
  action: fromActions.TemperatureSensorsActionsUnion
): TemperatureSensorState {
  switch(action.type) {

    case fromActions.TemperatureSensorActions.LoadLastLimitedSuccess: {
      return {
        ...state,
        lastFindItems: action.payload.data,
        loaded: true
      }
    }

    case fromActions.TemperatureSensorActions.LoadSearchItemsSuccess: {
      return {
        ...state,
        foundItems: action.payload.data
      }
    }

    case fromActions.TemperatureSensorActions.ResetFoundItems: {
      return {
        ...state,
        foundItems: new Map<string, TemperatureMeasurement[]>()
      }
    }

    default: {
      return state;
    }
  }
}

export const isLoaded = (state: TemperatureSensorState) => state.loaded;
export const getTempMeasurements = (state: TemperatureSensorState) => state.foundItems;
