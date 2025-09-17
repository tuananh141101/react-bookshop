import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL_LOCATION = "https://open.oapi.vn/location";
const API_URL =  import.meta.env.VITE_API_URL || "https://websitebook-api.vercel.app";


export const fetchListProvince = createAsyncThunk("location/fetchListProvinces", async () => {
    const res = await axios.get(`${API_URL_LOCATION}/provinces?page=0&size=100`);
    return res.data;
})
export const fetchListDistrict = createAsyncThunk(
  "location/fetchListDistricts",
  async (
    provinceId: string
  ) => {
    try {
      const res = await axios.get(
        `${API_URL_LOCATION}/districts/${provinceId}?page=0&size=100`
      )
      return { data: res.data }
    } catch (err: any) {
      console.log("error call list district", err)
    }
  }
)
export const fetchListWard = createAsyncThunk("location/fetchListWards", async (
    districtId: string
) => {
    try {
        const res = await axios.get(`${API_URL_LOCATION}/wards/${districtId}?page=0&size=100`);
        return { data: res.data }
    } catch(err:any) {
        console.log("error call list ward", err)
    }
})
export const fetchGetDataAddress = createAsyncThunk("auth/getDataUser", async (id:string | null) => {
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
