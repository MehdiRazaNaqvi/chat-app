import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterslice.jsx"



// console.log(counterReducer)


export const store = configureStore({
    reducer: {
        counter: counterReducer

    },
})



