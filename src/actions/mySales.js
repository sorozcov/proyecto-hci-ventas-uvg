import * as types from '../types/mySales';

export const addSale = sale => ({
  type: types.USER_SALE_ADDED,
  payload: sale,
});

export const changeSale = sale => ({
  type: types.USER_SALE_CHANGED,
  payload: sale,
});

export const deleteSale = saleid => ({
  type: types.USER_SALE_DELETED,
  payload: saleid,
});

export const clearSales = () => ({
  type: types.USER_SALES_CLEAR,
});