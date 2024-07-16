import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Event } from '@/types/event';

interface CategoryEventState {
  events: Event[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface SearchEventsByCategoryParams {
  category: string;
  page: number;
  size: number;
}

export const searchEventsByCategory = createAsyncThunk(
  'categoryEvents/search',
  async ({ category, page, size }: SearchEventsByCategoryParams) => {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/search?page=${page}&size=${size}`;
    
    if (category !== 'All') {
      url += `&categoryName=${encodeURIComponent(category)}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data.data;
  }
);

const initialState: CategoryEventState = {
  events: [],
  loading: 'idle',
  error: null,
  currentPage: 0,
  totalPages: 0,
  pageSize: 10
};

const categoryEventSlice = createSlice({
  name: 'categoryEvents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchEventsByCategory.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(searchEventsByCategory.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.events = action.payload.content;
        state.currentPage = action.payload.number;
        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.size;
      })
      .addCase(searchEventsByCategory.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export default categoryEventSlice.reducer;