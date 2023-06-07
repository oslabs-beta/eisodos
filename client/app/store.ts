import { configureStore } from '@reduxjs/toolkit';

// import reducers

export const store = configureStore({
  reducer: {
  }
});

// infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;