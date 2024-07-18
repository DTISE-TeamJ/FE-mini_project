import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RevenueData {
  [key: string]: number;
}

interface AnalyticsState {
  revenueData: RevenueData;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AnalyticsState = {
  revenueData: {},
  status: "idle",
  error: null,
};

export const fetchRevenueData = createAsyncThunk(
  "analytics/fetchRevenueData",
  async ({
    userId,
    startDate,
    endDate,
    interval,
  }: {
    userId: string | number;
    startDate: string;
    endDate: string;
    interval: "hourly" | "daily" | "monthly";
  }) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/analytics`,
      {
        params: { userId, startDate, endDate, interval },
      }
    );
    return response.data.data;
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRevenueData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.revenueData = action.payload;
      })
      .addCase(fetchRevenueData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch revenue data";
      });
  },
});

export default analyticsSlice.reducer;
