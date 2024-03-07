import { combineReducers } from "@reduxjs/toolkit";
import burgerIngredientsReducer, {
  burgerIngredientsSlice,
} from "./slices/burgerIngredientsSlice";
import burgerConstructorReducer, {
  burgerConstructorSlice,
} from "./slices/burgerConstructorSlice";
import orderDetailsReducer, {
  orderDetailsSlice,
} from "./slices/orderDetailsSlice";
import modalReducer, { modalSlice } from "./slices/modalSlice";
import userReducer, { userSlice } from "./slices/userSlice";

export const rootReducer = combineReducers({
  [burgerIngredientsSlice.name]: burgerIngredientsReducer,
  [burgerConstructorSlice.name]: burgerConstructorReducer,
  [orderDetailsSlice.name]: orderDetailsReducer,
  [modalSlice.name]: modalReducer,
  [userSlice.name]: userReducer,
});
