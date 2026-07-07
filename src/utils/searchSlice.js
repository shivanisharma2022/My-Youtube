import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResult: (state, action) => {
      // Mutates the Immer draft, so we don't need to return the state
      // mutates the existing state object in place. It copies properties from action.payload onto the draft state.
      // Redux Toolkit wraps your reducer in Immer, which tracks those mutations and turns them into a new immutable state for the store.
      state = Object.assign(state, action.payload);

      // This does not mutate the draft. It creates a new object and reassigns the local state variable to point at it.
      // This is the old way of doing it, but it doesn't mutate the state in place, so we need to return the state
      // state = {...state, ...action.payload};
      // If you want to use spread, return the new object:
      // return { ...state, ...action.payload };

      // Rule of thumb in RTK reducers: either mutate state, or return a new state — do not reassign state without returning.
    },
  },
});

export const { cacheResult } = searchSlice.actions;
export default searchSlice.reducer;

// here we do not need to clear the cache, beacuse it will be cleared automatically when the component unmounts(refreshed of the page)
// we can also do something like when reached to 100 searches, then start removing from the top of the cache.
