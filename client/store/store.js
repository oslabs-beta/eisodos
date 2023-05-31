import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";


// creating the store that holds the redux toolkit built in methods


export const store = configureStore({
 reducer: {
   userReducer: userReducer,
 },
});
