import { getUser, getLoginUser, getRegisterUser } from "../../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getActionName,
  isActionPending,
  isActionRejected,
} from "../../../utils/redux";

const initialState = {
  IsAuthChecked: false,
  data: null,

  registerUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserRequest: false,

  getUserError: null,
  getUserRequest: false,
};

export const sliceName = "user";

export const checkUserAuth = createAsyncThunk(
  `${sliceName}/checkUserAuth`,
  async () => {
    const data = await getUser();
    return data.data;
  }
);

export const registerUser = createAsyncThunk(
  `${sliceName}/checkUserAuth`,
  async () => {
    const data = await getRegisterUser();
    return data.data;
  }
);

export const loginUser = createAsyncThunk(
  `${sliceName}/checkUserAuth`,
  async () => {
    const data = await getLoginUser();
    return data.data;
  }
);

export const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    authCheck: (state) => {
      state.IsAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getUserRequest = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
      })
      .addMatcher(isActionPending(userSlice.name), (state, action) => {
        state[`${getActionName(action.type)}Request`] = true;
        state[`${getActionName(action.type)}Error`] = null;
      })
      .addMatcher(isActionRejected(userSlice.name), (state, action) => {
        state[`${getActionName(action.type)}Request`] = action.payload;
        state[`${getActionName(action.type)}Error`] = false;
      });
  },
});

export const { authCheck } = userSlice.actions;
export default userSlice.reducer;
