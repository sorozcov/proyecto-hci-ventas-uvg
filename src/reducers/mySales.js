import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/mySales';


const order = (state = [], action) => {
  switch (action.type) {
    case types.USER_SALE_ADDED: {
      return [...state, action.payload.saleid];
    }
    case types.USER_SALE_DELETED: {
      const newState = state.filter(sale => sale !==  action.payload);
      return newState;
    }
    case types.USER_SALES_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.USER_SALE_ADDED: {
      return {
        ...state,
        [action.payload.saleid]: action.payload,
      };
    }
    case types.USER_SALE_CHANGED: {
      return {
        ...state,
        [action.payload.saleid]: {
          ...state[action.payload.saleid],
          ...action.payload,
        },
      };
    }
    case types.USER_SALE_DELETED: {
      return omit(state, action.payload.saleid);
    }
    case types.USER_SALES_CLEAR: {
      const newState = {};
      return newState;
    }
    default: {
      return state;
    }
  }
};

const mySaleSelected = (state = null, action) => {
  switch (action.type) {
    case types.USER_SALE_SELECTED: {
      return action.payload;
    }
    case types.USER_SALE_DESELECTED: {
      var newState = null;
      return newState;
    }
    default: {
      return state;
    }
  }
};

const mySales = combineReducers({
  byId,
  order,
  mySaleSelected,
});

export default mySales;


export const getMySale = (state, saleid) => state.byId[saleid];
export const getAllMySales = state => state.order.map(
  id => getMySale(state, id),
).filter(sale => sale != null);
export const getMySales = state => state.order.filter(sale => !sale.isSold).map(
  id => getMySale(state, id),
).filter(sale => sale != null);
export const getMySoldSales = state => state.order.filter(sale => sale.isSold).map(
  id => getMySale(state, id),
).filter(sale => sale != null);
export const getMySaleSelected = (state) => state.mySaleSelected;
