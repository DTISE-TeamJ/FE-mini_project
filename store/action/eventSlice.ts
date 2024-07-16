import { Event, FetchEventsParams, SearchEventsParams } from "@/types/event";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface PaginatedResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Event[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  totalPages: number;
  currentPage: number;
  activeCategory: string;
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  loading: "idle",
  error: null,
  totalPages: 1,
  currentPage: 0,
  activeCategory: "All",
};

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async ({ page = 0, size = 20 }: FetchEventsParams) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events?page=${page}&size=${size}`
    );
    const data = await response.json();
    console.log("Fetched events:", data);
    return data.data as PaginatedResponse;
  }
);

export const searchEvents = createAsyncThunk(
  "events/searchEvents",
  async (params: SearchEventsParams) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/v1/events/search?${queryParams.toString()}`
    );
    const data = await response.json();
    console.log("Searched events:", data);
    return data.data as PaginatedResponse;
  }
);

export const fetchEventDetails = createAsyncThunk(
  "events/fetchEventDetails",
  async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/${id}`
    );
    const data = await response.json();
    console.log("Fetched event details:", data);
    return data.data as Event;
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
        state.activeCategory = action.payload;
        state.currentPage = 0;
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<PaginatedResponse>) => {
          state.loading = "succeeded";
          state.events = action.payload.content;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.number;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })
      .addCase(searchEvents.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(searchEvents.fulfilled, (state, action: PayloadAction<PaginatedResponse | null>) => {
        state.loading = "succeeded";
        if (action.payload) {
          state.events = action.payload.content || [];
          state.totalPages = action.payload.totalPages || 0;
          state.currentPage = action.payload.number || 0;
        } else {
          state.events = [];
          state.totalPages = 0;
          state.currentPage = 0;
        }
      })
      .addCase(searchEvents.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchEventDetails.fulfilled,
        (state, action: PayloadAction<Event>) => {
          state.loading = "succeeded";
          state.currentEvent = action.payload;
        }
      )
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { setActiveCategory, setCurrentPage } = eventSlice.actions;

export default eventSlice.reducer;
