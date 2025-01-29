import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    username: "",

}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.username = action.payload
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.username = ""
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;