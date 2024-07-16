import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Event } from '@/types/event';

interface LocationEventState {
  events: Event[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  location: string;
}

interface SearchEventsByLocationParams {
  location: string;
  page: number;
  size: number;
}

export const searchEventsByLocation = createAsyncThunk(
  'locationEvents/search',
  async ({ location, page, size }: SearchEventsByLocationParams) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/search?location=${encodeURIComponent(location)}&page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data.data;
  }
);

const initialState: LocationEventState = {
  events: [],
  loading: 'idle',
  error: null,
  currentPage: 0,
  totalPages: 0,
  pageSize: 10,
  location: 'Jakarta',
};

const locationEventSlice = createSlice({
  name: 'locationEvents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchEventsByLocation.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(searchEventsByLocation.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.events = action.payload.content;
        state.currentPage = action.payload.number;
        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.size;
      })
      .addCase(searchEventsByLocation.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default locationEventSlice.reducer;