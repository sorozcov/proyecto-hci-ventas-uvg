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

const savedSales = combineReducers({
  byId,
  order,
});

export default savedSales;


export const getSavedSale = (state, saleid) => state.byId[saleid];
export const getSavedSales = state => state.order.map(
  id => getSavedSale(state, id),
).filter(sale => sale != null);
