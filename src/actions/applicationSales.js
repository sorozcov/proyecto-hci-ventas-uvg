import * as types from '../types/applicationSales';

export const fetchNewSales = sales => ({
  type: types.FETCH_NEW_SALES,
  payload: sales,
});

export const fetchMoreSales = sales => ({
  type: types.FETCH_MORE_SALES,
  payload: sales,
});

export const clearSales = () => ({
  type: types.FETCH_CLEAR_SALES,
  payload: null,
});


