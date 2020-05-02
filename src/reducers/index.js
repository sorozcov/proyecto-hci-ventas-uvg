import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import loggedUser, * as loggedUserSelectors from './loggedUser';
import sales, * as salesSelectors from './sales';
import categories, * as categoriesSelectors from './categories';


const reducer = combineReducers({
  loggedUser,
  sales,
  categories,
  form: formReducer,
});


export default reducer;

//Selectors de usuarios
export const getLoggedUser = state => loggedUserSelectors.getLoggedUser(state.loggedUser);
export const isLoggedUser = state => loggedUserSelectors.isLoggedUser(state.loggedUser);
//Selectors de categorías
export const getCategory = (state, categoryid) => categoriesSelectors.getCategory(state.categories, categoryid);
export const getCategories = state => categoriesSelectors.getCategories(state.categories);
//Selectors de sales
export const getMySale = (state, saleid) => salesSelectors.getMySale(state.sales, saleid);
export const getAllMySales = state => salesSelectors.getAllMySales(state.sales);
export const getMySales = state => salesSelectors.getMySales(state.sales);
export const getMySoldSales = state => salesSelectors.getMySoldSales(state.sales);
export const getMySaleSelected = (state) => salesSelectors.getMySaleSelected(state.sales);
export const getSavedSale = (state, saleid) => salesSelectors.getSavedSale(state.sales, saleid);
export const getSavedSales = state => salesSelectors.getSavedSales(state.sales);

export const getSale = (state, saleid) => salesSelectors.getSale(state.sales, saleid);
export const getAllSales = state => salesSelectors.getAllSales(state.sales);
export const getLastFetched = state => salesSelectors.getLastFetched(state.sales);
