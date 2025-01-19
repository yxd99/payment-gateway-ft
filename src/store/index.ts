import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import storage from 'redux-persist/lib/storage';

import productSelectedReducer from '@/features/products/infrastructure/redux/product-selected-slice';
import { checkoutMiddleware, checkoutReducer } from '@/features/checkout/infrastructure/redux/checkout-slice';
import { config } from '@/config/envs';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  productSelected: productSelectedReducer,
  checkout: checkoutReducer.payment,
  checkoutApi: checkoutReducer.checkoutApi,
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
    }).concat(checkoutMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
