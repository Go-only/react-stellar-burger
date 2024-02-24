import { getIngredientsRequest } from "../../utils/api";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Начальное состояние для среза ингредиентов бургера
const initialState = {
  ingredients: [], // Массив ингредиентов
  loading: true, // Флаг загрузки
  error: null // Ошибка (если есть)
};

const sliceName = 'burgerIngredients';

// Создаем асинхронное действие (thunk) для загрузки ингредиентов

export const fetchIngredients = createAsyncThunk(
  `${sliceName}/fetchIngredients`,
  async () => {
    const response = await getIngredientsRequest();
    const data = await response.json();
    return data.data;
  }
);


// Создаем срез (slice) для управления ингредиентами бургера
export const burgerIngredientsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
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
        state.error = action.error.message;
      });
  }
});

export const selectIngredients = state => state.burgerIngredients.ingredients;
export default burgerIngredientsSlice.reducer; // Экспортируем редьюсер

