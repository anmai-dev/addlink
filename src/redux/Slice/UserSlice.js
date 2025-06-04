import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: "User",
    initialState: {
        getAllUser: {
            currentUser: [],
            isLoading: false,
            error: null,
        },
        deleteUser: {
            isLoading: false,
            error: null,
        },
        getAllUserPending: {
            isLoading: false,
            currentUser: [],
            error: false
        }

    },
    reducers: {
        getAllUserStart: (state) => {
            state.getAllUser.isLoading = true;
        },
        getAllUserSuccess: (state, action) => {
            state.getAllUser.currentUser = action.payload;
            state.getAllUser.isLoading = false;
        },
        getAllUserFailure: (state, action) => {
            state.getAllUser.error = action.payload;
            state.getAllUser.isLoading = false;
        },
        deleteUserStart: (state) => {
            state.deleteUser.isLoading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.deleteUser.isLoading = false;
        },
        deleteUserFailure: (state, action) => {
            state.deleteUser.error = action.payload;
            state.deleteUser.isLoading = false;
        },
        getAllUserPendingstart: (state) => {
            state.getAllUserPending.isLoading = true;
        },
        getAllUserPendingSuccess: (state, action) => {
            state.getAllUserPending.isLoading = false;
            state.getAllUserPending.currentUser = action.payload;
        },
        getAllUserPendingFailed: (state) => {
            state.getAllUserPending.isLoading = false;
            state.getAllUserPending.error = true
        }
    }
});
export const { getAllUserStart, getAllUserSuccess, getAllUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure,
    getAllUserPendingstart, getAllUserPendingSuccess, getAllUserPendingFailed
} = userSlice.actions;
export default userSlice.reducer;
