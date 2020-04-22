import { combineReducers } from 'redux';

import * as types from '../types/sales';


const order = (state = [], action) => {
  switch (action.type) {
    case types.SALE_ADDED: {
      return [...state, action.payload.saleid];
    }
    case types.SALES_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const byId = (state = [], action) => {
  switch (action.type) {
    case types.SALE_ADDED: {
      return {
        ...state,
        [action.payload.saleid]: action.payload,
      };
    }
    case types.SALES_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const selected = (state = {}, action) => {
  switch (action.type) {
    case types.SALE_SELECTED: {
      var newState = action.payload;
      return newState;
    }
    case types.SALE_DESELECTED: {
      var newStateClear = {};
      return newStateClear;
    }
    default: {
      return state;
    }
  }
};

const sales = combineReducers({
  byId,
  order,
  selected,
});

export default sales;

export const getSale = (state, saleid) => state.byId[saleid];
export const getSales = state => state.order.map(
  id => getSale(state, id),
).filter(sale => sale != null);
export const getSelectedSale = state => (state.selected);