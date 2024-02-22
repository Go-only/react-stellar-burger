import { combineReducers } from '@reduxjs/toolkit';
import burgerIngredientsReducer, { burgerIngredientsSlice } from './slices/burgerIngredientsSlice';
import burgerConstructorReducer, { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import modalReducer, { modalSlice } from './slices/modalSlice';

export const rootReducer = combineReducers({
  [burgerIngredientsSlice.name]: burgerIngredientsReducer,
  [burgerConstructorSlice.name]: burgerConstructorReducer,
  [modalSlice.name]: modalReducer,
});