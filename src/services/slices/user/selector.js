import store from "../..";
import { userSlice } from "./UserSlice";

export const getUser = store[userSlice.name].data;
export const getIsAuthChecked = store[userSlice.name].isAuthChecked;
