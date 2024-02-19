
import { combineReducers } from '@reduxjs/toolkit';
import burgerIngredientsReducer, { burgerIngredientsSlice } from './slices/burgerIngredientsSlice';

export const rootReducer = combineReducers({
  [burgerIngredientsSlice.name]: burgerIngredientsReducer,
});