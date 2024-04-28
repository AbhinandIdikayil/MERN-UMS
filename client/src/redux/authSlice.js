import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    isUserAuthenticated: null,
    userToken: null,
    isAdminAuthenticated: null,
    adminToken: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.isUserAuthenticated = true
            state.userToken = action.payload
        },
        userLogout: (state, action) => {
            state.isUserAuthenticated = false
            state.userToken = null;
        },
        adminLogin: (state, action) => {

        },
        adminLogout: (state, action) => {

        }
    }
})

export const { adminLogin, adminLogout, userLogin, userLogout } = authSlice.actions
export default authSlice.reducer