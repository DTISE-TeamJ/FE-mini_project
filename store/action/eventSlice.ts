import {
  Event,
  EventCategory,
  FetchEventsParams,
  SearchEventsParams,
  UpdateEventParams,
} from "@/types/event";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface PaginatedResponse {
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
  totalElements: number;
  eventCategories: EventCategory[];
  eventCategoriesLoading: "idle" | "pending" | "succeeded" | "failed";
  eventCategoriesError: string | null;
  userEvents: Event[];
  userEventsLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  loading: "idle",
  error: null,
  totalPages: 1,
  currentPage: 0,
  activeCategory: "All",
  totalElements: 0,
  eventCategories: [],
  eventCategoriesLoading: "idle",
  eventCategoriesError: null,
  userEvents: [],
  userEventsLoading: "idle",
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

export const createEvent = createAsyncThunk<Event, FormData>(
  "events/createEvent",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/create-event`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data.data as Event;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const fetchEventCategories = createAsyncThunk(
  "events/fetchEventCategories",
  async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/event-categories`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch event categories");
    }
    const data = await response.json();
    return data.data as EventCategory[];
  }
);

export const updateEvent = createAsyncThunk<Event, UpdateEventParams>(
  "events/updateEvent",
  async ({ id, formData }: UpdateEventParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/edit-event/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data.data as Event;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const fetchEventsByUserId = createAsyncThunk(
  "events/fetchEventsByUserId",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/user/${userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.data) {
        throw new Error("No data returned from the server");
      }
      return data.data as Event[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
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
    appendEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = [...state.events, ...action.payload];
    },
    clearError: (state) => {
      state.error = null;
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
      .addCase(
        searchEvents.fulfilled,
        (state, action: PayloadAction<PaginatedResponse | null>) => {
          state.loading = "succeeded";
          if (action.payload) {
            state.events = action.payload.content || [];
            state.totalElements = action.payload.totalElements || 0;
          } else {
            state.events = [];
            state.totalElements = 0;
          }
        }
      )
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
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchEventCategories.pending, (state) => {
        state.eventCategoriesLoading = "pending";
      })
      .addCase(fetchEventCategories.fulfilled, (state, action) => {
        state.eventCategoriesLoading = "succeeded";
        state.eventCategories = action.payload;
      })
      .addCase(fetchEventCategories.rejected, (state, action) => {
        state.eventCategoriesLoading = "failed";
        state.eventCategoriesError =
          action.error.message || "Failed to fetch event categories";
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = "succeeded";
        const index = state.events.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.currentEvent && state.currentEvent.id === action.payload.id) {
          state.currentEvent = action.payload;
        }
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to update event";
      })
      .addCase(fetchEventsByUserId.pending, (state) => {
        state.userEventsLoading = "pending";
        state.error = null;
      })
      .addCase(
        fetchEventsByUserId.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.userEventsLoading = "succeeded";
          state.userEvents = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchEventsByUserId.rejected, (state, action) => {
        state.userEventsLoading = "failed";
        state.error =
          (action.payload as string) || "Failed to fetch user events";
      });
  },
});

export const { setActiveCategory, setCurrentPage, appendEvents } =
  eventSlice.actions;

export default eventSlice.reducer;
