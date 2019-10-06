import {compareByType, Sensor} from '../../model/Sensor';

import * as fromActions from '../actions/index';
import {ComponentsMode} from '../../crosscutting/componentsMode';

export interface SensorsState {
  items: Sensor[];
  hasLoaded: boolean;
}

export const initialState: SensorsState = {
  items: [],
  hasLoaded: false
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

    default: {
      return state;
    }

  }
}

export const getAllItems = (state: SensorsState) => state.items;
export const getHasLoaded = (state: SensorsState) => state.hasLoaded;

