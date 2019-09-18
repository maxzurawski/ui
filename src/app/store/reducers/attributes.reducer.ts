import {AttributeDictionary} from '../../model/AttributeDictionary';

import * as fromActions from '../actions/index';

export interface AttributesState {
  items: AttributeDictionary[];
  hasLoaded: boolean;
}

export const initialState: AttributesState = {
  items: [],
  hasLoaded: false
};

export function attributesReducer(
  state = initialState,
  action: fromActions.AttributeUnions
): AttributesState {

  switch (action.type) {
    case fromActions.AttributeDictionaryActions.LoadAttributesBegin: {
      return {
        ...state,
        items: []
      };
    }

    case fromActions.AttributeDictionaryActions.LoadAttributesSuccessful: {
      return {
        ...state,
        items: action.payload.data,
        hasLoaded: true
      };
    }

    case fromActions.AttributeDictionaryActions.UpdateAttribute: {
      const payload = action.payload.data;
      const copyItems = state.items;
      const filtered = copyItems.filter(item => item.symbol === payload.symbol);
      if (filtered.length === 1 ) {
        filtered[0].name = payload.name;
        filtered[0].description = payload.description;
      }
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

export const getAttributes = (state: AttributesState) => state.items;
export const getHasLoaded = (state: AttributesState) => state.hasLoaded;
