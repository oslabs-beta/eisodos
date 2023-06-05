import { configureStore } from '@reduxjs/toolkit';

// import reducers
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: { 
    counter: counterReducer 
  }
});

// infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;