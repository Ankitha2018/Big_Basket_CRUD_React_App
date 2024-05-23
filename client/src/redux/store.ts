import { configureStore, Reducer, applyMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import productSlice from './productsSlice';

export const store = configureStore({
  reducer: {
    bigBasket: productSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;