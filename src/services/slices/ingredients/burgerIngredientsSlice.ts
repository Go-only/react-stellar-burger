import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { IngredientType } from "../../../utils/prop-types";

import api from "../../../utils/api";

// Интерфейс для состояния ингредиентов
interface IngredientsState {
  ingredients: IngredientType[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние для среза ингредиентов бургера
export const initialState: IngredientsState = {
  ingredients: [], // Массив ингредиентов
  loading: true, // Флаг загрузки
  error: null, // Ошибка (если есть)
};

const sliceName = "burgerIngredients";

// Создаем асинхронное действие (thunk) для загрузки ингредиентов
export const fetchIngredients = createAsyncThunk(
  `${sliceName}/fetchIngredients`,
  async () => {
    const data = await api.getIngredientsRequest();
    return data.data;
  }
);

// Создаем срез (slice) для управления ингредиентами бургера
export const burgerIngredientsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Селекторы для доступа к состоянию ингредиентов
export const selectIngredients = (state: RootState) =>
  state.burgerIngredients.ingredients;
export const selectLoadingStatus = (state: RootState) =>
  state.burgerIngredients.loading;
export const selectError = (state: RootState) => state.burgerIngredients.error;

export default burgerIngredientsSlice.reducer; // Экспортируем редьюсер
