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
}

const initialState: CategoryState = {
  activeCategory: "All",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { changeCategory } = categorySlice.actions;

export const selectActiveCategory = (state: RootState) =>
  state.category.activeCategory;

export default categorySlice;