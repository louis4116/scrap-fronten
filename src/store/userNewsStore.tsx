import { createSlice } from '@reduxjs/toolkit';

interface UserNewsStoreState {
  news: DATAPROPS[];
}

const userNewsStoreSlice = createSlice({
  name: 'userNewsStore',
  initialState: {
    news: [],
  } as UserNewsStoreState,
  reducers: {
    storeUserNews: (state, action) => {
      const data = action.payload;
      if (!data) return;
      //儲存使用者已儲存新聞
      state.news = data;
    },
  },
});

export const userNewsAction = userNewsStoreSlice.actions;

export default userNewsStoreSlice;
