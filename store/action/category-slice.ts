import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  organization: string;
  description: string;
  start: string;
  end: string;
  pic: string;
  eventCategory: { id: number; name: string };
  user: [];
  ticketTypes: [];
  promos: [];
}

interface CategoryState {
  activeCategory: string;
  data: Event[];
}

const initialState: CategoryState = {
  activeCategory: "All",
  data: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategory: (
      state,
      action: PayloadAction<{ category: string; events: Event[] }>
    ) => {
      state.activeCategory = action.payload.category;
      state.data = action.payload.events.filter(
        (event) =>
          action.payload.category === "All" ||
          event.eventCategory.name === action.payload.category
      );
    },
  },
});

export const { changeCategory } = categorySlice.actions;

export const selectActiveCategory = (state: RootState) =>
  state.category.activeCategory;
export const selectCategoryData = (state: RootState) => state.category.data;

export default categorySlice;
