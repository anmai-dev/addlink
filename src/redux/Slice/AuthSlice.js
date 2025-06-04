import { createSlice } from '@reduxjs/toolkit';

// Lấy dữ liệu user từ localStorage nếu có
const persistedUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const authSlice = createSlice({
    name: "Auth",
    initialState: {
        login: {
            currentUser: persistedUser,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.currentUser = action.payload;
            state.login.isFetching = false;
            // Lưu user vào localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailure: (state) => {
            state.login.error = true;
            state.login.isFetching = false;
        },
        logout: (state) => {
            state.login.currentUser = null;
            // Xóa user khỏi localStorage
            localStorage.removeItem('user');
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
            state.register.error = false;
        },
        registerFailure: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFailure } = authSlice.actions;
export default authSlice.reducer;
