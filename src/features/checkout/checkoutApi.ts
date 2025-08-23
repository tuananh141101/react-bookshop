import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


const API_URL = "https://open.oapi.vn/location";

export const fetchListProvince = createAsyncThunk("location/fetchListProvinces", async () => {
    const res = await axios.get(`${API_URL}/provinces?page=0&size=100`);
    return res.data;
})
export const fetchListDistrict = createAsyncThunk<any, void, {state: RootState}>("location/fetchListDistricts", async (_, {getState}) => {
    const {province} = getState().checkoutStore
    const res = await axios.get(`${API_URL}/districts/${province}?page=0&size=100`);
    return res.data;
})
export const fetchListWard = createAsyncThunk<any, void, {state: RootState}>("location/fetchListWards", async (_, {getState}) => {
    const {district} = getState().checkoutStore
    const res = await axios.get(`${API_URL}/wards/${district}?page=0&size=100`);
    return res.data;
})
