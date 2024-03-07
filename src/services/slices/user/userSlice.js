import {
  getUser,
  getLoginUser,
  getRegisterUser,
  updateUserProfile,
  logoutUserApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getActionName,
  isActionPending,
  isActionRejected,
} from "../../../utils/redux";
import { deleteCookie, setCookie } from "../../../utils/cookies";

const initialState = {
  IsAuthChecked: false, // факт проверки аутентификации пользователя (прошла ли уже эта проверка или нет)
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
  async (_, { dispatch }) => {
    try {
      const data = await getUser();
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      dispatch(authCheck());
    }
  }
);

export const registerUser = createAsyncThunk(
  `${sliceName}/registerUser`,
  async (dataUser) => {
    const data = await getRegisterUser(dataUser);
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,
  async (dataUser) => {
    const data = await getLoginUser(dataUser);
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  `${sliceName}/logoutUser`,
  async () => {
    await logoutUserApi();
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
  }
);

export const forgotPassword = createAsyncThunk(
  `${sliceName}/forgotPassword`,
  async (email) => {
    const data = await forgotPasswordApi(email);
    return data;
  }
);

export const resetPassword = createAsyncThunk(
  `${sliceName}/resetPassword`,
  async (data) => {
    const response = await resetPasswordApi(data);
    console.log(data);
    return response;
  }
);

export const updateUserInfo = createAsyncThunk(
  `${sliceName}/updateUserInfo`,
  async (data) => {
    const response = await updateUserProfile(data);
    return response;
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
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
      })
      .addMatcher(isActionPending(userSlice.name), (state, action) => {
        state[`${getActionName(action.type)}Request`] = true;
        state[`${getActionName(action.type)}Error`] = null;
      })
      .addMatcher(isActionRejected(userSlice.name), (state, action) => {
        state[`${getActionName(action.type)}Request`] = action.payload;
        state[`${getActionName(action.type)}Error`] = action.error.message;
      });
  },
});

export const { authCheck } = userSlice.actions;
export default userSlice.reducer;
