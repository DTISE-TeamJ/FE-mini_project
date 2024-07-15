import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface EditEventPayload {
  id: number;
  updatedEvent: Partial<Event>;
}

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
  user: any[];
  ticketTypes: any[];
  promos: any[];
}

interface EventsState {
  result: any;
  loading: boolean;
  error: string | null;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

const initialState: EventsState = {
  result: [],
  loading: false,
  error: null,
  totalElements: 0,
  totalPages: 0,
  size: 10,
  number: 0,
  numberOfElements: 0,
  first: true,
  last: false,
  empty: false,
};

const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events`,

    {
      // withCredentials: true,
    }
  );

  // console.log(data.data, "<==");
  return data.data;
});

const fetchMetadata = createAsyncThunk("events/metadata", async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/metadata`,

    {
      // withCredentials: true,
    }
  );

  // console.log(data.data, "<==");
  return data.data;
});

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

const searchEvents = createAsyncThunk(
  "events/searchEvents",
  async (searchTerm: string) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/search`,
      {
        params: { q: searchTerm },
      }
    );
    return data.data.event;
  }
);

const fetchEventDetail = createAsyncThunk(
  "events/fetchEventDetail",
  async (id: number) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/${id}`,
      {
        // withCredentials: true,
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
      // .addCase(
      //   fetchEvents.fulfilled,
      //   (state, action: PayloadAction<Event[]>) => {
      //     state.result = action.payload;
      //     state.loading = false;
      //   }
      // )

      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.result = action.payload.content;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
        state.size = action.payload.size;
        state.number = action.payload.number;
        state.numberOfElements = action.payload.numberOfElements;
        state.first = action.payload.first;
        state.last = action.payload.last;
        state.empty = action.payload.empty;
      })
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
          state.result = action.payload;
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
          const index = state.result.findIndex((e: any) => e.id === event.id);
          if (index !== -1) {
            state.result[index] = event;
          } else {
            state.result.push(event);
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
          state.result = state.result.filter(
            (event: any) => event.id !== action.payload
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
        const index = state.result.findIndex(
          (event: any) => event.id === updatedEvent.id
        );
        if (index !== -1) {
          state.result[index] = updatedEvent;
        }
        state.loading = false;
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit event";
      });
  },
});

export {
  fetchEvents,
  fetchEventsPage,
  searchEvents,
  fetchEventDetail,
  deleteEvent,
  editEvent,
};

export default eventsSlice;
