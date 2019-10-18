import {CachedSensor} from "../../model/CachedSensor";
import * as fromActions from '../actions/index';

export interface CachedSensorsState {
  items: CachedSensor[];
  loaded: boolean;
}

export const initialState: CachedSensorsState = {
  items: [],
  loaded: false
};

export function cachedSensorsReducer(
  state = initialState,
  action: fromActions.CachedSensorsActionsUnion
): CachedSensorsState {

  switch (action.type) {
    case fromActions.CachedSensorsActions.LoadCachedSensorsSuccess: {
      return {
        ...state,
        items: action.payload.cachedSensors,
        loaded: true
      }
    }

    default: {
      return state;
    }
  }
}

export const getCachedSensors = (state: CachedSensorsState) => state.items;
export const getLoaded = (state: CachedSensorsState) => state.loaded;

