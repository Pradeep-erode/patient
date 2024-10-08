//below code executes redux without any storage and used only for data passing from one component to another
// import { configureStore } from '@reduxjs/toolkit';
// import itemsReducer from './itemsSlice';

// const store = configureStore({
//   reducer: {
//     items: itemsReducer,
//   },
// });

// export default store;

//below code executes redux persist with local storage
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to local storage

import counterReducer from './itemsSlice'; // Import your item slice

// Configure Persist
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted Reducer for update state
const persistedReducer = persistReducer(persistConfig, counterReducer);

//store Combining the slice reducers into the root reducer
const store = configureStore({
  reducer: {
    items: persistedReducer,
  },
});

//redux store
export const persistor = persistStore(store);
export default store;