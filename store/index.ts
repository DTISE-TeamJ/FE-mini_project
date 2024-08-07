/*
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import eventsSlice from "./action/event-slice";
import categorySlice from "./action/category-slice";
import metadataReducer from "./action/metadataSlice";
import eventsReducer from "./action/eventSlice";
import eventCategoryReducer from "./action/categoryEventSlice"
import eventLocationReducer from "./action/locationEventSlice"
import orderSlice from "./action/order-slice";

const store = configureStore({
  reducer: {
    eventStore: eventsSlice.reducer,
    category: categorySlice.reducer,
    metadata: metadataReducer,
    events: eventsReducer,
    categoryEvents: eventCategoryReducer,
    locationEvents: eventLocationReducer,
    orderItem: orderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
*/

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import eventsSlice from "./action/event-slice";
import categorySlice from "./action/category-slice";
import orderSlice from "./action/order-slice";
import metadataReducer from "./action/metadataSlice";
import eventsReducer from "./action/eventSlice";
import eventCategoryReducer from "./action/categoryEventSlice"
import eventLocationReducer from "./action/locationEventSlice"
import analyticsReducer from "./action/analyticsSlice";

const rootReducer = combineReducers({
  eventStore: eventsSlice.reducer,
  category: categorySlice.reducer,
  orderItem: orderSlice.reducer,
  metadata: metadataReducer,
  events: eventsReducer,
  categoryEvents: eventCategoryReducer,
  locationEvents: eventLocationReducer,
  analytics: analyticsReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const persistor = persistStore(store);
export { store, persistor, useAppDispatch, useAppSelector };
