import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import api from "../../utils/api";
import { OrderType } from "../../utils/prop-types";

interface IOrderDetailsState {
  order: {
    number: number | null; // Номер заказа
  } | null;
  currentOrder: OrderType | null;
  loading: boolean; // Флаг загрузки
  error: string | null; // Ошибка (если есть)
}

const initialState: IOrderDetailsState = {
  order: null,
  currentOrder: null,
  loading: true,
  error: null,
};

const sliceName = "orderDetails";

export const fetchOrderResult = createAsyncThunk(
  `${sliceName}/fetchOrderResult`,
  async (ingredients: any) => {
    const data = await api.createOrderRequest(ingredients);
    return data;
  }
);

export const getOrder = createAsyncThunk<
  OrderType,
  string,
  { state: RootState }
>(`${sliceName}/getOrder`, async (number) => {
  const data = await api.getOrderApi(number);
  return data.orders[0];
});

export const orderDetailsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderResult.pending, (state) => {
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
        state.error = action.error.message || null;
        state.order = null;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default orderDetailsSlice.reducer;

export const selectOrderDetails = (state: RootState) => state.orderDetails;
