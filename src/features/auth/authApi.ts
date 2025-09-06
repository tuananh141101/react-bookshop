import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3000";

export const fetchLogin = createAsyncThunk("auth/login", async (
    { body, callback }: { body: { email: string; password: string }; callback?: () => void },
    { rejectWithValue }
) => {
    try {
        const res = await axios.post(`${API_URL}/login`, body);
        if (callback) callback();
        return {
            data: res.data,
            status: res.status,
            headers:  { ...res.headers },
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
        username: string;
        role: "user"
    },
    {rejectWithValue}
) => {
    try {
        const res = await axios.post(`${API_URL}/register`, body);
        return {
            data: res.data,
            status: res.status,
            headers:  { ...res.headers },
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

export const fetchGetDataUser = createAsyncThunk("auth/getDataUser", async (id:string | null) => {
    try {
        const res = await axios.get(`${API_URL}/users/${id}`);
        return {
            data: res.data,
            status: res.status,
            headers:  { ...res.headers },
        }
    } catch(error:any) {
        console.log("data error", error)
    }
})


