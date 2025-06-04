import { createSlice } from "@reduxjs/toolkit";

const linkSlice = createSlice({
    name: "Link",
    initialState: {

        getAllLinkbySlug: {
            currentLink: [],
            isLoading: false,
            error: null,
        },
        createLink: {
            isLoading: false,
            error: null,
        },
        getSlugByuserId: {
            slug: [],
            isLoading: false,
            error: false,
            success: false
        }

    },
    reducers: {
        getAllLinkbySlugStart: (state) => {
            state.getAllLinkbySlug.isLoading = true;
        },
        getAllLinkbySlugSuccess: (state, action) => {
            state.getAllLinkbySlug.currentLink = action.payload;
            state.getAllLinkbySlug.isLoading = false;
        },
        getAllLinkbySlugFailure: (state, action) => {
            state.getAllLinkbySlug.error = action.payload;
            state.getAllLinkbySlug.isLoading = false;
        },
        createLinkStart: (state) => {
            state.createLink.isLoading = true;
        },
        createLinkSuccess: (state, action) => {
            state.createLink.isLoading = false;
        },
        createLinkFailure: (state, action) => {
            state.createLink.error = action.payload;
            state.createLink.isLoading = false;
        },
        getSlugByuserIdStart: (state) => {
            state.getSlugByuserId.isLoading = true;
        },
        getSlugByuserIdSuccess: (state, action) => {
            state.getSlugByuserId.isLoading = false;
            state.getSlugByuserId.slug = action.payload;
            state.getSlugByuserId.success = true;
        },
        getSlugByuserIdFaild: (state) => {
            state.getSlugByuserId.isLoading = false;
            state.getSlugByuserId.error = true
        }


    }
});

export const { getAllLinkbySlugStart, getAllLinkbySlugSuccess, getAllLinkbySlugFailure,
    createLinkStart, createLinkSuccess, createLinkFailure, getSlugByuserIdStart, getSlugByuserIdFaild, getSlugByuserIdSuccess } = linkSlice.actions;
export default linkSlice.reducer;

