"use client";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { RootState } from "..";

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
  order: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  loading: false,
  error: null,
};

// const { data: session, status } = useSession();

// console.log(session, "<===");

// const addOrderItem = createAsyncThunk(
//   "order/addOrderItem",
//   async (orderData: OrderData, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/add-item`,
//         orderData,
//         {
//           withCredentials: true,
//         }
//       );
//       return data.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// const addOrderItem = createAsyncThunk(
//   "order/addOrderItem",
//   async (
//     { orderData, token }: { orderData: OrderData; token?: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/add-item`,
//         orderData,
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return data.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const addOrderItem = createAsyncThunk(
  "order/addOrderItem",
  async (
    { orderData, token }: { orderData: OrderData; token?: string },
    { rejectWithValue }
  ) => {
    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/add-item`,
        orderData,
        {
          withCredentials: true,
          headers,
        }
      );
      return data.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.error("Unauthorized: Token may be invalid or expired");
        // You might want to dispatch an action to clear the auth state or redirect to login
      }
      return rejectWithValue(
        error.response?.data || "Failed to add order item"
      );
    }
  }
);

// const getOrderItem = createAsyncThunk(
//   "order/getOrderItem",
//   async (id: number, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/unpaid/${id}`,
//         {
//           withCredentials: true,
//         }
//       );
//       return data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data || "Failed to fetch order item"
//       );
//     }
//   }
// );

const getOrderItem = createAsyncThunk(
  "order/getOrderItem",
  async (
    { id, token }: { id: number; token?: string },
    { rejectWithValue }
  ) => {
    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/unpaid/${id}`,
        {
          withCredentials: true,
          headers,
        }
      );
      return data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch order item"
      );
    }
  }
);

const adjustQuantity = createAsyncThunk(
  "order/adjustQuantity",
  async (
    { itemId, quantity }: { itemId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/adjust-quantity`,
        { itemId, quantity },
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

const calculatePrices = (orderItems: TicketRequest[]) => {
  const totalOriginalPrice = orderItems?.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );
  const finalPrice = orderItems?.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  return { totalOriginalPrice, finalPrice };
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const itemToUpdate = state.order?.[0]?.orderItems?.find(
        (item: TicketRequest) => item.id === itemId
      );
      if (itemToUpdate) {
        itemToUpdate.quantity += quantity;
        if (itemToUpdate.quantity < 1) {
          itemToUpdate.quantity = 1; // Ensure quantity doesn't go below 1
        }
        const { totalOriginalPrice, finalPrice } = calculatePrices(
          state.order[0].orderItems
        );
        state.order[0].totalOriginalPrice = totalOriginalPrice;
        state.order[0].finalPrice = finalPrice;
      }
    },
    deleteItem(state, action) {
      const itemId = action.payload;
      if (state.order && state.order[0] && state.order[0].orderItems) {
        state.order[0].orderItems = state.order[0].orderItems.filter(
          (item: TicketRequest) => item.id !== itemId
        );

        const { totalOriginalPrice, finalPrice } = calculatePrices(
          state.order[0].orderItems
        );
        state.order[0].totalOriginalPrice = totalOriginalPrice;
        state.order[0].finalPrice = finalPrice;
      }
    },

    clearOrderData: (state) => {
      return initialState;
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
        const { totalOriginalPrice, finalPrice } = calculatePrices(
          state.order.orderItems
        );
        state.order.totalOriginalPrice = totalOriginalPrice;
        state.order.finalPrice = finalPrice;
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
        const { totalOriginalPrice, finalPrice } = calculatePrices(
          state.order.orderItems
        );
        state.order.totalOriginalPrice = totalOriginalPrice;
        state.order.finalPrice = finalPrice;
      })
      .addCase(getOrderItem.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adjustQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(adjustQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        const { totalOriginalPrice, finalPrice } = calculatePrices(
          state.order.orderItems
        );
        state.order.totalOriginalPrice = totalOriginalPrice;
        state.order.finalPrice = finalPrice;
      })
      .addCase(adjustQuantity.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateQuantity, deleteItem, clearOrderData } =
  orderSlice.actions;

export { addOrderItem, getOrderItem, adjustQuantity };

export default orderSlice;
