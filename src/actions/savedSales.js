import * as types from '../types/savedSales';

export const saveSale = sale => ({
  type: types.SAVED_SALE_ADDED,
  payload: sale,
});

export const unsaveSale = saleid => ({
  type: types.SAVED_SALE_DELETED,
  payload: saleid,
});

export const clearSavedSales = () => ({
  type: types.SAVED_SALES_CLEAR,
});