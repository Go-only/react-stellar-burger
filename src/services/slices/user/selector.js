import { createSelector } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

// Селектор для получения данных пользователя
export const getUser = createSelector(
  (state) => state[userSlice.name].data,
  (data) => data
);

// Селектор для проверки состояния аутентификации
export const getIsAuthChecked = createSelector(
  (state) => state[userSlice.name].IsAuthChecked,
  (isAuthChecked) => isAuthChecked
);
