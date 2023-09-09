import { createSlice } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('authToken');
const initialState = {
  loginState: storedToken ? (JSON.parse(storedToken) as AuthState) : null,
  user: {} as User,
};

const authStoreSlice = createSlice({
  name: 'authStore',
  initialState,
  reducers: {
    storeToken: (state, action) => {
      const data = action.payload;
      state.loginState = data;
      localStorage.setItem('authToken', JSON.stringify(data));
    },
    removeToken: (state) => {
      state.loginState = null;
      localStorage.removeItem('authToken');
    },
    storeUser: (state, action) => {
      const data = action.payload;
      if (!data) return;
      state.user = data;
    },
  },
});

export const authStoreActions = authStoreSlice.actions;

export default authStoreSlice;
