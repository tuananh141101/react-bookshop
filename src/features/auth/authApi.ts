import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// const API_URL = "http://localhost:3000"
const API_URL = import.meta.env.VITE_API_URL || "https://websitebook-api.vercel.app";
const API_URL_LOCATION = "https://open.oapi.vn/location";

export const fetchListProvinceData = createAsyncThunk("location/fetchListProvinces", async () => {
    const res = await axios.get(`${API_URL_LOCATION}/provinces?page=0&size=100`);
    return res.data;
})
export const fetchListDistrictData = createAsyncThunk("location/fetchListDistrict", async (provinceId: string) => {
    try {
        const res = await axios.get(`${API_URL_LOCATION}/districts/${provinceId}?page=0&size=100`)
        return res.data
    } catch (error) {
        console.log("error", error)
    }
})
export const fetchListWard = createAsyncThunk("location/fetchListWard", async (districtId: string) => {
    try {
        const res = await axios.get(`${API_URL_LOCATION}/wards/${districtId}?page=0&size=100`);
        return res.data;
    } catch (error) {
        console.log("eror", error)
    }
})
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
            })
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
export const fetchChangeAddress = createAsyncThunk<
  any,
  {
        billingAddress: {
            type: string;
            fullname: string;
            address: string;
            phone: string;
            email: string;
        };
        shippingAddress: {
            type: string;
            fullname: string;
            address: string;
            phone: string;
            proviceId: string;
            districtId: string;
            wardId: string;
        }
    },
  { state: RootState }
>(
    "settings/changeDataAddress",
    async (payload, { getState }) => {
    try {
            const { id } = getState().authStore;

            const res = await axios.patch(`http://localhost:3000/users/${id}`, {
                billingAddress: payload.billingAddress,
                shippingAddress: payload.shippingAddress,
            });

            return {
                data: res.data,
                status: res.status,
                headers: { ...res.headers },
            };
        } catch (error) {
            console.log("Error change address", error);
            throw error;
        }
    }
);
export const fetchChangeDataUser = createAsyncThunk<
    any, 
    {
        username: string,
        email: string
    },
    {state: RootState}
>("settings/changeDataUser", async (payload, {getState}) => {
    try {
        const { id } = getState().authStore;
        const res = await axios.patch(`${API_URL}/users/${id}`,
            {
                username: payload.username,
                email: payload.email
            }
        );
        return {
            data:res.data,
            status: res.status,
            headers: {...res.headers}
        }
    } catch (error) {
        console.log("Error change data account", error);
        throw error
    }
})
export const fetchForgetEmail = createAsyncThunk("user/forgetPassWrod", async(email:string) => {
    try {
        const res = await axios.post(`${API_URL}/forgot-password`, {
            email: email
        })
        return res.data
    } catch (error:any) {
        console.error("Error call forget email", error)
        if (error.response) {
            return error.response.data
        }
        console.error("Unexpected error", error.response)
        throw error
    }
})
export const fetchVerifyResetToken = createAsyncThunk("auth/verify-reset-token", async(token:string) => {
    try {
        const res = await axios.get(`${API_URL}/verify-reset-token/${token}`)
        return res.data
    } catch (error:any) {
        if (error.response) {
            return error.response.data  // vẫn trả về data của server
        }
        console.error("Unexpected error", error.response)
        throw error
    }
});
export const fetchResetPassWord = createAsyncThunk("auth/reset-password", async(
    payload: { newPassword: string; token: string }
) => {
    try {
        const res = await axios.post(`${API_URL}/reset-password`, {
            token: payload.token,
            newPassword: payload.newPassword
        })
        return res.data
    } catch (error:any) {
        if (error.response) {
            return error.response.data
        }
        console.log("Unexpected error", error.response)
    }
})