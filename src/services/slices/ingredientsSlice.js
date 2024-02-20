import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
const initialState = {
  selectedIngredient: null,
};

const sliceName = 'ingredients';

// Создание слайса
export const ingredientsSlice = createSlice({
  name: sliceName, // Имя слайса
  initialState, // Начальное состояние
  reducers: {
    // Редюсеры для управления состоянием
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
    setSelectedIngredient(state, action) {
      state.selectedIngredient = action.payload;
    },
    clearSelectedIngredient(state) {
      state.selectedIngredient = null;
    },
  },
});

// Экспорт действий и редюсера
export const { setIngredients, setSelectedIngredient, clearSelectedIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
