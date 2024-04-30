import { createSlice } from "@reduxjs/toolkit";

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
        setUserLogin: (state, action) => {
            state.isUserAuthenticated = true
            state.userToken = action.payload
        },
        setUserLogout: (state) => {
            state.isUserAuthenticated = false
            state.userToken = null;
        },
        adminLogin: (state, action) => {
            state.isAdminAuthenticated = true;
            state.adminToken = action.payload;
        },
        adminLogout: (state, action) => {
            state.isAdminAuthenticated = false
            state.adminToken = action.payload;
        }
    }
})

export const {adminLogin,  adminLogout, setUserLogin, setUserLogout } = authSlice.actions
export default authSlice.reducer