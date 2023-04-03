import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count:0,
}

const counterSlice = createSlice ({
    name:"counter",
    initialState,
    reducers : {
        increment: (store) => {
            store.count += 1;
        },
        decrement: (store) => {
            store.count -= 1;
        },
        incrementByValue: (store, action) => {
            store.count += action.payload;
        }
    }
})

export const {increment, decrement, incrementByValue} = counterSlice.actions;
export default counterSlice.reducer;