import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Начальное состояние для среза ингредиентов бургера
const initialState = {
  ingredients: [], // Массив ингредиентов
  loading: true, // Флаг загрузки
  error: null, // Ошибка (если есть)
  currentTab: 'one', // Текущий выбранный таб
  scrollPositions: {
    one: 0,
    two: 0,
    three: 0
  }
};

const api_url = 'https://norma.nomoreparties.space/api/ingredients';
const sliceName = 'burgerIngredients';

// Создаем асинхронное действие (thunk) для загрузки ингредиентов
export const fetchIngredients = createAsyncThunk(
  `${sliceName}/fetchIngredients`,
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch(api_url);
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
  reducers: {
    setCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
    setScrollPosition(state, action) {
      const { tab, position } = action.payload;
      state.scrollPositions[tab] = position;
    },
  },
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

export const { setCurrentTab, setScrollPosition } = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer; // Экспортируем редьюсер
