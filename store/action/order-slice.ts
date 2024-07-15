import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface TicketRequest {
  appliedPromoCode: string | null;
  discountedPrice: number;
  eventName: string;
  id: number;
  originalPrice: number;
  quantity: number;
  ticketName: string;
  ticketTypeId: number;
}

interface OrderData {
  userId: number;
  ticketRequests: TicketRequest[];
}

interface OrderState {
  order: any;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: [],
  loading: false,
  error: null,
};

const addOrderItem = createAsyncThunk(
  "order/addOrderItem",
  async (orderData: OrderData, { rejectWithValue }) => {
    console.log(orderData, "<==");

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/add-item`,
        orderData,
        {
          withCredentials: true,
        }
      );
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getOrderItem = createAsyncThunk(
  "order/getOrderItem",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/unpaid/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(data.data, "<===");

      return data.data;
    } catch (error: any) {
      console.error(error, "<===");
      return rejectWithValue(
        error.response?.data || "Failed to fetch order item"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const itemToUpdate = state.order.find((item: any) => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    deleteItem(state, action) {
      const itemId = action.payload;
      state.order = state.order.filter((item: any) => item.id !== itemId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(addOrderItem.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getOrderItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderItem.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateQuantity, deleteItem } = orderSlice.actions;

export { addOrderItem, getOrderItem };

export default orderSlice;

/*
// order-slice.ts

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const addOrderItem = createAsyncThunk(
  "order/addOrderItem",
  async (orderData: OrderData, { rejectWithValue }) => {
    console.log(orderData, "<==");

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/add-item`,
        orderData,
        {
          withCredentials: true,
        }
      );
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getOrderItem = createAsyncThunk(
  "order/getOrderItem",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/unpaid/${id}`,
        {
          withCredentials: true,
        }
      );
      return data.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch order item"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrderItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(addOrderItem.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderItem.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(getOrderItem.rejected, (state: any, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export { addOrderItem, getOrderItem };

export default orderSlice;
*/
