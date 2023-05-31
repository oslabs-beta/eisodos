import { createSlice } from '@redux/toolkit';


// userReducer sets the state by sending the action payload


// initial state is set to empty/null until onChange happens
export const userReducer = createSlice({
   name: 'userReducer',
   initialState: {
       currentUser: null,
       errorMessage: [],
   },


   reducers: {
       setCurrentUser: (state, action) => {
           state.currentUser = action.payload;
       },
       setErrorMessage: (state, action) => {
           state.errorMessage = action.payload;
       }
   }
})


export const {
   setCurrentUser,
   setErrorMessage,
} = userReducer.actions;


export default userReducer.reducer;