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
  eventCategory: [];
  user: [];
  ticketTypes: [];
  promos: [];
}

interface EditEventPayload {
  id: number;
  updatedEvent: Partial<Event>;
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
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
      });
  },
});

export { fetchEvents, fetchEventDetail, deleteEvent, editEvent };

export default eventsSlice;
