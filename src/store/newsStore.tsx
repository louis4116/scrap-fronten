import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface News<T> {
  data: T[];
  pathName: string;
}

interface NewsStoreState {
  [key: string]: NewsShape[];
}

const newsStoreSlice = createSlice({
  name: 'newsStore',
  initialState: {
    ltn: [],
    military: [],
    cna: [],
    udn: [],
  } as NewsStoreState,
  reducers: {
    storeNews: (state, action: PayloadAction<News<NewsShape>>) => {
      //儲存爬蟲獲取的新聞
      const { data, pathName } = action.payload;
      if (pathName.includes('ltn')) {
        state.ltn = data;
      }
      if (pathName.includes('military')) {
        state.military = data;
      }
      if (pathName.includes('cna')) {
        state.cna = data;
      }
      if (pathName.includes('udn')) {
        state.udn = data;
      }
    },
  },
});

export const newsStoreActions = newsStoreSlice.actions;

export default newsStoreSlice;
