import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApiService } from "./api-service";

interface User {
  email: string;
}

const initialState: User = {
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.email = action.payload.email;
    },
    clearStore(state) {
      state.email = initialState.email;
    },
  },
});

export const { setUser, clearStore } = userSlice.actions;
export const userReducer = {
  [userSlice.name]: userSlice.reducer,
  [userApiService.reducerPath]: userApiService.reducer, 
};
export const userMiddleware = userApiService.middleware;
export default userReducer;