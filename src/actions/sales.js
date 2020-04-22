import * as types from '../types/sales';


export const addSale = artist => ({
  type: types.SALE_ADDED,
  payload: artist,
});

export const clearSales = () => ({
  type: types.SALES_CLEAR,
});

export const selectSale = artist => ({
  type: types.SALE_SELECTED,
  payload: artist,
});

export const deselectSale = () => ({
  type: types.SALE_DESELECTED,
});