import { createSelector } from "@reduxjs/toolkit";
import { userSlice } from "../services/slices/user/userSlice";
import { RootState } from "../services";

// Селектор для проверки состояния аутентификации
export const getIsAuthChecked = createSelector(
  (state: RootState) => state[userSlice.name].IsAuthChecked,
  (isAuthChecked) => isAuthChecked
);
