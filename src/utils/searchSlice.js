import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    cache: {},
  },
  reducers: {
    cacheResult: (state, action) => {
      Object.assign(state.cache, action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { cacheResult, setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
