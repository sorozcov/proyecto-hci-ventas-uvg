import { combineReducers } from 'redux';

import * as types from '../types/categories';


const order = (state = [], action) => {
  switch (action.type) {
    case types.CATEGORY_ADDED: {
      return [...state, action.payload.categoryid];
    }
    case types.CATEGORIES_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const byId = (state = [], action) => {
  switch (action.type) {
    case types.CATEGORY_ADDED: {
      return {
        ...state,
        [action.payload.categoryid]: action.payload,
      };
    }
    case types.CATEGORIES_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const categories = combineReducers({
  byId,
  order,
});

export default categories;

export const getCategory = (state, categoryid) => state.byId[categoryid];
export const getCategories = state => state.order.map(
  id => getCategory(state, id),
).filter(category => category != null);