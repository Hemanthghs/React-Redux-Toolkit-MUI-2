import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[
        {
          "id": 1,
          "name": "Hemanth"
        },
        {
          "id": 2,
          "name": "Vishal",
        },
      ],
}

const userSlice = createSlice ({
    name:"counter",
    initialState,
    reducers : {
        addUser: (state, action) => {
            let newUserId = state.data.length + 1;
            let newUser = {id: newUserId, ...action.payload}
            state.data.push(newUser);
        },
        deleteUser: (state, action) => {
            let index = state.data.findIndex((user)=>user.id === action.payload)
            state.data.splice(index,1);
        },
        updateUser: (state, action) => {
            let index = state.data.findIndex((user) => user.id === action.payload.id)
            state.data[index] = action.payload
        },
        getUsers: (state) => {
            state.data = [...state.data]
        }
    }
})

export const { addUser, deleteUser, updateUser, getUsers } = userSlice.actions;
export default userSlice.reducer;