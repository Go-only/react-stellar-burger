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
  async (ingredients) => {
      const data = await createOrderRequest(ingredients);
      return data;
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

