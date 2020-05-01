import * as types from '../types/mySales';

export const addMySale = sale => ({
  type: types.USER_SALE_ADDED,
  payload: sale,
});

export const changeMySale = sale => ({
  type: types.USER_SALE_CHANGED,
  payload: sale,
});

export const deleteMySale = saleid => ({
  type: types.USER_SALE_DELETED,
  payload: saleid,
});

export const clearMySales = () => ({
  type: types.USER_SALES_CLEAR,
});