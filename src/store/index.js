import { createSlice,configureStore } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {items: {}},
  reducers:{
    initItems(state,action){
      state.items=action.payload;
    },
    addItem(state,action){
      state.items[action.payload.key]=action.payload;
    },
    deleteItem(state,action){
      delete state.items[action.payload];
      localStorage.setItem("data", JSON.stringify(state.items));
    },
    updateItem(state){
      localStorage.setItem("data", JSON.stringify(state.items));
    },
    incrementTime(state,action){
      state.items[action.payload.key].time.s++;
      if (state.items[action.payload.key].time.s === 60) {
        state.items[action.payload.key].time.s = 0;
        state.items[action.payload.key].time.m++;
      }
      if (state.items[action.payload.key].time.m === 60) {
        state.items[action.payload.key].time.m = 0;
        state.items[action.payload.key].time.h++;
      }
    }
  }
});

const store = configureStore({
  reducer: itemsSlice.reducer
});

export const itemsActions = itemsSlice.actions;
export default store;