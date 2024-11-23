import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const token = localStorage.getItem("token");

export const getAllHomeData = createAsyncThunk(
  "getAllHomeData",
  async ({ url }) => {
    try {
      const response = await axios.get(url, {
        headers: {
          //   authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response?.data;
    } catch (error) {
      console.log(error);
      return error?.response?.data;
    }
  }
);

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: {
    loading: false,
    homeData: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllHomeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.homeData = action?.payload;
      })
      .addCase(getAllHomeData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default homeSlice.reducer;
