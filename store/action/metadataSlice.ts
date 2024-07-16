import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Metadata {
  locations: string[];
  categories: string[];
}

interface MetadataState {
  data: Metadata | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MetadataState = {
  data: null,
  loading: 'idle',
  error: null,
};

export const fetchMetadata = createAsyncThunk(
  'metadata/fetchMetadata',
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/events/metadata`);
    const data = await response.json();
    console.log('Fetched metadata:', data);
    return data.data as Metadata;
  }
);

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetadata.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMetadata.fulfilled, (state, action: PayloadAction<Metadata>) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchMetadata.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default metadataSlice.reducer;