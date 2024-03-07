import { createSelector } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

// Селектор для проверки состояния аутентификации
export const getIsAuthChecked = createSelector(
  (state) => state[userSlice.name].IsAuthChecked,
  (isAuthChecked) => isAuthChecked
);
