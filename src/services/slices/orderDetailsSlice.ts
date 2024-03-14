import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { createOrderRequest } from "../../utils/api";
import { IngredientType } from "../../utils/prop-types";

interface IOrderDetailsState {
  order: number | null; // Номер заказа
  loading: boolean; // Флаг загрузки
  error: string | null; // Ошибка (если есть)
}

const initialState: IOrderDetailsState = {
  order: null,
  loading: true,
  error: null,
};

const sliceName = "orderDetails";

export const fetchOrderResult = createAsyncThunk(
  `${sliceName}/fetchOrderResult`,
  async (ingredients: any) => {
    const data = await createOrderRequest(ingredients);
    return data;
  }
);

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
      });
  },
});

export default orderDetailsSlice.reducer;

export const selectOrderDetails = (state: RootState) => state.orderDetails;
