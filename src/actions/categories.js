import * as types from '../types/categories';


export const addCategory = category => ({
  type: types.CATEGORY_ADDED,
  payload: category,
});

export const clearCategories = () => ({
  type: types.CATEGORIES_CLEAR,
});