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

export const selectMySale = sale => ({
  type: types.USER_SALE_SELECTED,
  payload: sale,
});

export const deselectMySale = () => ({
  type: types.USER_SALE_DESELECTED,
});

export const clearMySales = () => ({
  type: types.USER_SALES_CLEAR,
});