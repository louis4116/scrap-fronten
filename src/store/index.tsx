import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import newsStoreSlice from './newsStore';
import authStoreSlice from './authStore';
import userNewsStoreSlice from './userNewsStore';
import { newsApi } from '../api/newsApi';
import { authApi } from '../api/authApi';
import { userDataApi } from '../api/userDataApi';

const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userDataApi.reducerPath]: userDataApi.reducer,
    newsStoreResult: newsStoreSlice.reducer,
    authStoreResult: authStoreSlice.reducer,
    userNewsStoreResult: userNewsStoreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      authApi.middleware,
      userDataApi.middleware,
    ),
});

export default store;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
