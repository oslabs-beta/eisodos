import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorSliceState {
  currentUser: null;
  errorMessage: string | null | 'p';
}

const initialState: ErrorSliceState = {
  currentUser: null,
  errorMessage: null
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrorMessage: {
      reducer: (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
      },
      prepare: (errorMessage: string) => {
        return { payload: errorMessage };
      }
    }
  }
});

export const { setErrorMessage } = errorSlice.actions;
export default errorSlice.reducer;
