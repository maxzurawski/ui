import {compareByType, Sensor} from '../../model/Sensor';

import * as fromActions from '../actions/index';
import {ComponentsMode} from '../../crosscutting/componentsMode';

export interface SensorsState {
  items: Sensor[];
  hasLoaded: boolean;
  mode: ComponentsMode;
}

export const initialState: SensorsState = {
  items: [],
  hasLoaded: false,
  mode: ComponentsMode.New
};

export function sensorsReducer(
  state = initialState,
  action: fromActions.SensorsActionsUnion
): SensorsState {

  switch (action.type) {
    case fromActions.SensorsActions.LoadAllSensorsSuccess: {
      return {
        ...state,
        items: action.payload.sensors,
        hasLoaded: true
      };
    }

    case fromActions.SensorsActions.UpdateDetailsMode: {
      return {
        ...state,
        items: state.items,
        hasLoaded: state.hasLoaded,
        mode: action.payload.mode
      };
    }

    case fromActions.SensorsActions.DeleteSensorSuccess: {
      const uuid = action.payload.uuid;
      const copyItems = state.items.filter(obj => obj.uuid !== uuid);
      copyItems.sort(compareByType);
      return {
        ...state,
        items: copyItems,
        hasLoaded: true
      };
    }

    case fromActions.SensorsActions.UpdateSensorSuccess: {
      const sensor = action.payload.sensor;
      const copyItems = state.items;
      const originalSensor = copyItems.find(item => item.uuid === sensor.uuid);
      const index = copyItems.indexOf(originalSensor);
      copyItems[index] = sensor;
      copyItems.sort(compareByType);
      return {
        ...state,
        items: copyItems,
        hasLoaded: true
      };
    }

    case fromActions.SensorsActions.SaveSensorSuccess: {
      const sensor = action.payload.sensor;
      let copyItems = state.items;
      if (!copyItems) {
        copyItems = new Array();
      }
      copyItems.push(sensor);
      copyItems.sort(compareByType);
      return {
        ...state,
        items: copyItems,
        hasLoaded: true
      };
    }

    default: {
      return state;
    }

  }
}

export const getAllItems = (state: SensorsState) => state.items;
export const getHasLoaded = (state: SensorsState) => state.hasLoaded;
export const getUuids = (state: SensorsState) => {
  if (state.items) {
    return state.items.map( obj => obj.uuid);
  }
  return [];
};
export const getSensorDetailsMode = (state: SensorsState) => state.mode;
