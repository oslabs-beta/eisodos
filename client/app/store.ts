import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from '../store/userReducer';


// import reducers
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
  },
});

// infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;