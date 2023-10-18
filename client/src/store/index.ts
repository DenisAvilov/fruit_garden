// import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
// import authReducer from './slice/authSlice';
// import productReducer from './slice/productSlice';
// import basketReducer from './slice/basketSlice';

// export const makeStore = () => {
//   const store = configureStore({
//     reducer: {
//       auth: authReducer,
//       product: productReducer,
//       basket: basketReducer,
//     },
//   });

//   return store;
// };

// export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
// export type RootState = ReturnType<typeof makeStore>['getState'];

// const wrapper = createWrapper(makeStore);

// export { wrapper };

// https://www.youtube.com/watch?v=e7oHgiN5kv8&ab_channel=ArchakovBlog

import { configureStore, combineReducers, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import {Action, Store} from 'redux';
import categoryAndSubCategories from './slice/categoriesSlice'
// import authReducer, { AuthState } from './slice/authSlice';
import productReducer from './slice/productSlice';
import basketReducer from './slice/basketSlice';
import { Category } from '@/pages/api/category/category.interface';

// export interface State {
//    category: Category
// }

// Объедините ваши редюсеры в один корневой редюсер
const rootReducer = combineReducers({
  productCategor :categoryAndSubCategories
  // auth: authReducer,
  // product: productReducer,
  // basket: basketReducer,
});

// Добавьте обработку HYDRATE для объединения состояний
const reducer: typeof rootReducer = (state , action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return rootReducer(state, action);
};

export const makeStore = () =>
  configureStore({
    reducer,
  });


export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

//  export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });
 export const wrapper = createWrapper(makeStore);

