import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import basketReducer from './slice/basketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    basket: basketReducer,
  },
}); 

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
