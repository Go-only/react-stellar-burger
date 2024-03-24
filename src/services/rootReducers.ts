import { combineReducers } from "@reduxjs/toolkit";
import burgerIngredientsReducer, {
  burgerIngredientsSlice,
} from "./slices/ingredients/burgerIngredientsSlice";
import burgerConstructorReducer, {
  burgerConstructorSlice,
} from "./slices/constructor/burgerConstructorSlice";
import orderDetailsReducer, {
  orderDetailsSlice,
} from "./slices/order/orderDetailsSlice";
import modalReducer, { modalSlice } from "./slices/modal/modalSlice";
import userReducer, { userSlice } from "./slices/user/userSlice";
import { feed } from "./feed/reducers";
import { Orders } from "./orders/reducers";

export const rootReducer = combineReducers({
  [burgerIngredientsSlice.name]: burgerIngredientsReducer,
  [burgerConstructorSlice.name]: burgerConstructorReducer,
  [orderDetailsSlice.name]: orderDetailsReducer,
  [modalSlice.name]: modalReducer,
  [userSlice.name]: userReducer,
  feed: feed,
  Orders: Orders,
});
