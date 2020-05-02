import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/applicationSales';


const order = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_NEW_SALES: {
      const sales = action.payload;
      const salesIds=sales.map((sale)=>sale.saleid);
      return [...salesIds];
    }
    case types.FETCH_MORE_SALES: {
      const sales = action.payload;
      const salesIds=sales.map((sale)=>sale.saleid);
      return [...state, ...salesIds];
    }
    case types.FETCH_CLEAR_SALES: {
      return [];
    }
    default: {
      return state;
    }
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_NEW_SALES: {
      const newState = {}
      const sales = action.payload;
      sales.forEach((sale)=>{
        newState[sale.saleid]=sale;
      })
      return newState;
    }
    case types.FETCH_MORE_SALES: {
      const newState = {...state}
      const sales = action.payload;
      sales.forEach((sale)=>{
        newState[sale.saleid]=sale;
      })
      return newState;
    }
    case types.FETCH_CLEAR_SALES: {
      return {};
    }
    default: {
      return state;
    }
  }
};

const lastSaleFetched = (state = 0, action) => {
  switch (action.type) {
    case types.FETCH_NEW_SALES: {
      return 20;
    }
    case types.FETCH_MORE_SALES: {
      
      return state+20;
    }
    case types.FETCH_CLEAR_SALES: {
      return 0;
    }
    default: {
      return state;
    }
  }
};


const applicationSales = combineReducers({
  byId,
  order,
  lastSaleFetched,
});

export default applicationSales;


export const getSale = (state, saleid) => state.byId[saleid];
export const getAllSales = state => state.order.map(
  id => getSale(state, id),
).filter(sale => sale != null);
export const getLastFetched = state => state.lastSaleFetched;