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
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
      if (!response.ok) {
        return rejectWithValue({ message: `Ошибка при загрузке данных: ${response.status}` });
      }
      const data = await response.json();
      return fulfillWithValue(data.data);
    } catch (error) {
      return rejectWithValue({ message: `Ошибка при загрузке данных: ${error.message}` });
    }
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
console.log(burgerIngredientsSlice);

export default burgerIngredientsSlice.reducer; // Экспортируем редьюсер
