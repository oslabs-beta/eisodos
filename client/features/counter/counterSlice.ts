import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// define type for slice state
interface CounterState {
  value: number;
}

// define initial state
const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // reducer without payload
    increment(state) {
      state.value++; 
    },
    // reducer with payload
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

// export reducer
export default counterSlice.reducer;

// export action creators
export const { increment, incrementByAmount } = counterSlice.actions;