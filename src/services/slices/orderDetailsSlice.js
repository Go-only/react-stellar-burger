import { createOrderRequest } from "../../utils/api";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Начальное состояние для номера заказа
const initialState = {
    order: null,  // Номер заказа
    loading: true, // Флаг загрузки
    error: null   // Ошибка (если есть)
};

const sliceName = 'orderDetails';

export const fetchOrderResult = createAsyncThunk(
    `${sliceName}/fetchOrderResult`,
    async (ingredients, { rejectWithValue, fulfillWithValue }) => {
      try {
        // Вместо fetch вызываем createOrderRequest и передаем ему ингредиенты
        const response = await createOrderRequest(ingredients);
  
        if (!response.ok) {
          return rejectWithValue({ message: `Ошибка при загрузке данных: ${response.status}` });
        }
  
        const data = await response.json();
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue({ message: `Ошибка при загрузке данных: ${error.message}` });
      }
    }
  );

export const orderDetailsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrderResult.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderResult.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.error = null;
      })

      .addCase(fetchOrderResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.order = null; // Установка состояния order в null при возникновении ошибки
      });
  }
});

export default orderDetailsSlice.reducer; // Экспортируем редьюсер

