import { combineReducers } from 'redux';

import mySales, * as mySalesSelectors from './mySales';
import savedSales, * as savedSalesSelectors from './savedSales';
import applicationSales,* as applicationSalesSelectors  from './applicationSales';

const sales = combineReducers({
  mySales,
  savedSales,
  applicationSales
});

export default sales;

//Selectors de mySales
export const getMySale = (state, saleid) => mySalesSelectors.getMySale(state.mySales, saleid);
export const getAllMySales = state => mySalesSelectors.getAllMySales(state.mySales);
export const getMySales = state => mySalesSelectors.getMySales(state.mySales);
export const getMySoldSales = state => mySalesSelectors.getMySoldSales(state.mySales);
export const getMySaleSelected = (state) => mySalesSelectors.getMySaleSelected(state.mySales);
//Selectors de savedSales
export const getSavedSale = (state, saleid) => savedSalesSelectors.getSavedSale(state.savedSales, saleid);
export const getSavedSales = state => savedSalesSelectors.getSavedSales(state.savedSales);

export const getSale = (state, saleid) => applicationSalesSelectors.getSale(state.applicationSales, saleid);
export const getAllSales = state => applicationSalesSelectors.getAllSales(state.applicationSales);
export const getLastFetched = state => applicationSalesSelectors.getLastFetched(state.applicationSales);
