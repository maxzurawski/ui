import {SensorAttribute} from '../../model/SensorAttribute';

import * as fromActions from '../actions/index';
import {ComponentsMode} from '../../crosscutting/componentsMode';

export interface AttributesDialogState {
  opened: boolean;
  sensorsAttributes: SensorAttribute[];
  sensorAttribute: SensorAttribute;
  mode: ComponentsMode;
  sensorAttributeAfterUpdate: SensorAttribute;
}

export const initialState: AttributesDialogState = {
  opened: false,
  sensorsAttributes: [],
  sensorAttribute: null,
  mode: null,
  sensorAttributeAfterUpdate: null
};

export function attributesDialogReducer(
  state = initialState,
  action: fromActions.AttributesDialogActionsUnion
): AttributesDialogState {

  switch (action.type) {
    case fromActions.AttributesDialogActions.OpenDialogToAdd: {
      return {
        ...state,
        opened: true,
        sensorsAttributes: action.payload.sensorAttributes,
        mode: ComponentsMode.New,
      };
    }

    case fromActions.AttributesDialogActions.OpenDialogToUpdate: {
      return {
        ...state,
        opened: true,
        sensorAttribute: action.payload.sensorAttribute,
        sensorsAttributes: action.payload.sensorsAttributes,
        mode: ComponentsMode.Edit
      };
    }

    case fromActions.AttributesDialogActions.UpdateSensorAttribute: {
      return {
        ...state,
        opened: true,
        sensorsAttributes: state.sensorsAttributes,
        mode: state.mode,
        sensorAttributeAfterUpdate: action.payload.sensorAttribute
      };
    }

    case fromActions.AttributesDialogActions.CloseDialog: {
      return {
        ...state,
        opened: false,
        sensorsAttributes: [],
        mode: null,
        sensorAttributeAfterUpdate: null,
        sensorAttribute: null
      };
    }

    default: {
      return state;
    }
  }
}

export const getAttributesDialogOpened = (state: AttributesDialogState) => state.opened;
export const getSensorsAttributes = (state: AttributesDialogState) => state.sensorsAttributes;
export const getAttributesDialogMode = (state: AttributesDialogState) => state.mode;
export const getSensorAttribute = (state: AttributesDialogState) => state.sensorAttribute;
export const getSensorAttributeAfterUpdate = (state: AttributesDialogState) => {
  return {
    sensorAttributeToUpdate: state.sensorAttributeAfterUpdate,
    attributeDialogMode: state.mode
  };
};
