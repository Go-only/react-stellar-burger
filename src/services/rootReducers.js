import { combineReducers } from '@reduxjs/toolkit';
import burgerIngredientsReducer, { burgerIngredientsSlice } from './slices/burgerIngredientsSlice';
import ingredientsReducer, { ingredientsSlice } from './slices/ingredientsSlice';
import modalReducer, { modalSlice } from './slices/modalSlice';

export const rootReducer = combineReducers({
  [burgerIngredientsSlice.name]: burgerIngredientsReducer,
  [ingredientsSlice.name]: ingredientsReducer,
  [modalSlice.name]: modalReducer,
});