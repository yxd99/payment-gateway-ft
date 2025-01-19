import { createSlice, PayloadAction } from '@reduxjs/toolkit';


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
export const userReducer = userSlice.reducer;
export default userReducer;
