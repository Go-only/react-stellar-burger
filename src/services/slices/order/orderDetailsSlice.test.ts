// orderDetailsSlice.test.ts

import orderDetailsReducer, {
  initialState,
  fetchOrderResult,
  getOrder,
} from "./orderDetailsSlice";

const mockFetchOrderResultResponse = {
  order: { number: 123 },
};

const mockGetOrderResponse = {
  success: true,
  orders: [
    {
      number: 123,
      name: "Order Name",
    },
  ],
};

describe("orderDetailsSlice", () => {
  test("post order", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: fetchOrderResult.fulfilled.type,
        payload: mockFetchOrderResultResponse,
      })
    ).toEqual({
      order: mockFetchOrderResultResponse.order,
      currentOrder: null,
      loading: false,
      error: null,
    });
  });

  test("get order", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: getOrder.fulfilled.type,
        payload: mockGetOrderResponse.orders[0],
      })
    ).toEqual({
      currentOrder: mockGetOrderResponse.orders[0],
      order: null,
      loading: false,
      error: null,
    });
  });
});
