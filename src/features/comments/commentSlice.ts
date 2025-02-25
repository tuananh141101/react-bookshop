import { createSlice } from "@reduxjs/toolkit";
import { typeComment } from "../../common/constant/Constant";
// import { typeReply } from "../../common/constant/Constant";
import { fetchComments } from "./commentApi";
import { fetchBlogs } from "../blog/blogApi";

interface CommentState {
    listComments: typeComment[],
    loadingData: boolean;
    error: string | null;
    replyCommentForm: string | null;
    replyNameForm: string | null;
    replyEmailForm: string | null;
}

const initialState: CommentState = {
    listComments: [],
    loadingData: false,
    error: null,
    replyCommentForm: null,
    replyNameForm: null,
    replyEmailForm: null,
}

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setReplyCommentForm: (state, action) => {
            state.replyCommentForm = action.payload;
        },
        setReplyNameForm: (state, action) => {
            state.replyNameForm = action.payload;
        },
        setReplyEmailForm: (state, action) => {
            state.replyEmailForm = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loadingData = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state,action) => {
                state.listComments = action.payload;
                state.loadingData = false;
            })
            .addCase(fetchBlogs.rejected, (state) => {
                state.loadingData = false;
                state.error = "Something went wrong";
            })
    },
});

export const { setReplyCommentForm, setReplyNameForm, setReplyEmailForm } = commentSlice.actions;
export default commentSlice.reducer;
