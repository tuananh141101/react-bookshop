import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://open.oapi.vn/location";

export const fetchListProvince = createAsyncThunk("location/fetchListProvinces", async () => {
    const res = await axios.get(`${API_URL}/provinces?page=0&size=100`);
    return res.data;
})
export const fetchListDistrict = createAsyncThunk(
  "location/fetchListDistricts",
  async (
    { provinceId, form }: { provinceId: number; form: "form1" | "form2" }, // payload
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `${API_URL}/districts/${provinceId}?page=0&size=100`
      )
      return { data: res.data, form }
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error fetching districts")
    }
  }
)
export const fetchListWard = createAsyncThunk("location/fetchListWards", async (
    { districtId,form }: {districtId: number; form: "form1"|"form2"},
    { rejectWithValue } 
) => {
    try {
        const res = await axios.get(`${API_URL}/wards/${districtId}?page=0&size=100`);
        return { data: res.data, form }
    } catch(err:any) {
        return rejectWithValue(err.response?.data || "Error fetching wards")
    }
})
