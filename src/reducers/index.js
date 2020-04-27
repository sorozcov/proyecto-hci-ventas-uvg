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


export const getLoggedUser = state => loggedUserSelectors.getLoggedUser(state.loggedUser);
export const isLoggedUser = state => loggedUserSelectors.isLoggedUser(state.loggedUser);
export const getSale = (state, saleid) => salesSelectors.getSale(state.sales, saleid);
export const getSales = state => salesSelectors.getSales(state.sales);
export const getSelectedSale = state => salesSelectors.getSelectedSale(state.sales);
export const getCategory = (state, categoryid) => categoriesSelectors.getCategory(state.categories, categoryid);
export const getCategories = state => categoriesSelectors.getCategories(state.categories);
