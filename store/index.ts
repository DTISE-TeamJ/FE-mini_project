import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import eventsSlice from "./action/event-slice";
import categorySlice from "./action/category-slice";
import metadataReducer from "./action/metadataSlice";
import eventsReducer from "./action/eventSlice";
import eventCategoryReducer from "./action/categoryEventSlice"
import eventLocationReducer from "./action/locationEventSlice"

const store = configureStore({
  reducer: {
    eventStore: eventsSlice.reducer,
    category: categorySlice.reducer,
    metadata: metadataReducer,
    events: eventsReducer,
    categoryEvents: eventCategoryReducer,
    locationEvents: eventLocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
