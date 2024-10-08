import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item, index) => index !== action.payload);
    },
    updateItem: (state, action) => {
      const { index, newItem } = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items[index] = newItem;
      }
    },
    assignitem:(state,action)=>{
      state.items = action.payload;
    }
  },
});

export const { addItem, removeItem, updateItem,assignitem} = itemsSlice.actions;

export default itemsSlice.reducer;