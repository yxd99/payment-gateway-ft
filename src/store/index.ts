import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import storage from 'redux-persist/lib/storage';

import productSelectedReducer from '@/features/products/infrastructure/redux/product-selected-slice';
import { checkoutMiddleware, checkoutReducer } from '@/features/checkout/infrastructure/redux/checkout-slice';
import { config } from '@/config/envs';
import userReducer from '@/features/user/infrastructure/redux/user-slice';
import paymentReducer, { paymentMiddleware } from '@/features/user/infrastructure/redux/payments-slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['payments', 'userApi'],
};

const rootReducer = combineReducers({
  productSelected: productSelectedReducer,
  checkout: checkoutReducer.payment,
  checkoutApi: checkoutReducer.checkoutApi,
  user: userReducer,
  payments: paymentReducer.userApi,
  userApi: paymentReducer.userApi,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: config.env !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      }
    }).concat(checkoutMiddleware).concat(paymentMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
