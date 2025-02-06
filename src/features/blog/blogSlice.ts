import { createSlice } from "@reduxjs/toolkit";
import { typeBlog } from "../../common/constant/Constant";
import { fetchBlogs } from "./blogApi";

interface BlogState {
    listBlogs: typeBlog[];
    loadingData: boolean;
    error: string | null;
}

const initialState: BlogState = {
    listBlogs: [],
    loadingData: false,
    error: null,
};

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loadingData = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.listBlogs = action.payload;
                state.loadingData = false;
            })
            .addCase(fetchBlogs.rejected, (state) => {
                state.loadingData = false;
                state.error = "Something went wrong!";
            });
    },
});

export default blogSlice.reducer;
