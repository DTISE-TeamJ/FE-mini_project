import { configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import eventsSlice from "./action/event-slice";

const store = configureStore({
  reducer: {
    eventStore: eventsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
