import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name:'token',
    initialState:{
        value: ""
    },
    reducers:{
        storeToken: (state, action) => {
            state.value = action.payload;
        },
        resetToken: (state) => {
            state.value = "";
        }
    }
})

export const { storeToken, resetToken} = tokenSlice.actions;
export default tokenSlice.reducer;