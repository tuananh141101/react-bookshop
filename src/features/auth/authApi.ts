import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL || "https://websitebook-api.vercel.app";

export const fetchLogin = createAsyncThunk("auth/login", async (body: { email: string; password: string }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/login`, body);
        return {
            data: res.data,
            status: res.status,
            headers: res.headers,
        }
    } catch(error:any) {
        if (error.response) {
            return rejectWithValue({
            status: error.response.status,
            data: error.response.data,
            });
        }
        return rejectWithValue({ status: 500, data: "Server error" });
    }
})

export const fetchRegister = createAsyncThunk("auth/register" , async (
    body: {
        email: string;
        password: string;
        cart: any[];
        wishlist: any[];
        username: string
    },
    {rejectWithValue}
) => {
    try {
        const res = await axios.post(`${API_URL}/register`, body);
        return {
            data: res.data,
            status: res.status,
            headers: res.headers,
        }
    } catch (error: any) {
        if (error.response) {
            return rejectWithValue({
                status: error.response.status,
                data: error.response.data
            });
        } 
        return rejectWithValue({status: 500, data: "Server error"});
    }
})


