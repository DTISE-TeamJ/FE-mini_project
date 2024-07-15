import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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

interface EditEventPayload {
  id: number;
  updatedEvent: Partial<Event>;
}

interface Metadata {
  categories: string[];
  locations: string[];
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
<<<<<<< Updated upstream
=======
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  metadata: Metadata;
>>>>>>> Stashed changes
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
<<<<<<< Updated upstream
=======
  totalElements: 0,
  totalPages: 0,
  size: 10,
  number: 0,
  numberOfElements: 0,
  first: true,
  last: false,
  empty: false,
  metadata: {categories: [], locations: []}
>>>>>>> Stashed changes
};

const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events`,
    {
      // withCredentials: true,
    }
  );

  return data.data;
});

<<<<<<< Updated upstream
=======
const fetchEventsPage = createAsyncThunk(
  "events/fetchEvents",
  async (page: number) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events?page=${page}&size=${initialState.size}`
    );

    // console.log(response.data, "<==");
    return response.data;
  }
);

const fetchMetadata = createAsyncThunk("events/fetchMetadata", async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/metadata`
  );
  return data.data;
});

>>>>>>> Stashed changes
const searchEvents = createAsyncThunk(
  "events/searchEvents",
  async (searchTerm: string) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/search`,
      {
        params: { q: searchTerm },
        // withCredentials: true,
      }
    );
    return data.data;
  }
);

const fetchEventDetail = createAsyncThunk(
  "events/fetchEventDetail",
  async (id: number) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/${id}`,
      {
        withCredentials: true,
      }
    );

    return data.data;
  }
);

const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id: number) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/delete-event/${id}`,
      {
        withCredentials: true,
      }
    );

    return id;
  }
);

const editEvent = createAsyncThunk(
  "events/editEvent",
  async ({ id, updatedEvent }: EditEventPayload) => {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/edit-event/${id}`,
      updatedEvent,
      {
        withCredentials: true,
      }
    );
    return data.data;
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.events = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch events";
      })
      .addCase(searchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        searchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.events = action.payload;
          state.loading = false;
        }
      )
      .addCase(searchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search events";
      })
      .addCase(fetchEventDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchEventDetail.fulfilled,
        (state, action: PayloadAction<Event>) => {
          const event = action.payload;
          const index = state.events.findIndex((e) => e.id === event.id);
          if (index !== -1) {
            state.events[index] = event;
          } else {
            state.events.push(event);
          }
          state.loading = false;
        }
      )
      .addCase(fetchEventDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch event detail";
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteEvent.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.events = state.events.filter(
            (event) => event.id !== action.payload
          );
        }
      )
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete event";
      })

      .addCase(editEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(editEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        // Update the corresponding event in the state with the edited data
        const updatedEvent = action.payload;
        const index = state.events.findIndex(
          (event) => event.id === updatedEvent.id
        );
        if (index !== -1) {
          state.events[index] = updatedEvent;
        }
        state.loading = false;
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit event";
      })
      .addCase(fetchMetadata.fulfilled, (state, action: PayloadAction<Metadata>) => {
        state.metadata = action.payload;
      });
  },
});

<<<<<<< Updated upstream
export { fetchEvents, searchEvents, fetchEventDetail, deleteEvent, editEvent };
=======
export {
  fetchEvents,
  fetchMetadata,
  fetchEventsPage,
  searchEvents,
  fetchEventDetail,
  deleteEvent,
  editEvent,
};
>>>>>>> Stashed changes

export default eventsSlice;
