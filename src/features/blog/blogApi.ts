import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://websitebook-api.vercel.app/blog";

export const fetchBlogs = createAsyncThunk("blogs/fetchListBlogs", async () => {
    const res = await axios.get(API_URL);
    return res.data;
});
