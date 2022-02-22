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
    },
    updateItem(state,action){
      state.items[action.payload.key].time=action.payload.time
      localStorage.setItem("data", JSON.stringify(state.items));
    }
  }
});

const store = configureStore({
  reducer: itemsSlice.reducer
});

export const itemsActions = itemsSlice.actions;
export default store;