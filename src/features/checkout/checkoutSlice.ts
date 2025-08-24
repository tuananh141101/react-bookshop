import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { fetchListDistrict, fetchListProvince, fetchListWard } from "./checkoutApi";

interface CheckoutState {
    fullName: string,
    address: string,
    phone: number | null,
    email: string,
    // Billing info
    isDifferentBilling: boolean,
    billingFullName: string,
    billingAddress: string,
    billingPhone: number | null,
    // Location
    province: string,
    district: string,
    ward: string,
    dataProvince: unknown[],
    dataDistrict: unknown[],
    dataWard: unknown[],
    loadingDataLocation: boolean;
    error: string
    // Receiver
    receiverFullName: string,
    receiverPhone: number | null,
    receiverAddress:string,
    receiverProvince: string,
    receiverDistrict: string,
    receiverWard: string,
    receiverTaxAddress: string,
    receiverDataDistrict: unknown[],
    receiverDataWard: unknown[]
}

const initialState: CheckoutState = {
    fullName: "nguyen tuan anh",
    address: "",
    phone: null,
    email: "",
    // Billing
    isDifferentBilling: false,
    billingAddress: "",
    billingFullName: "",
    billingPhone: null,
    // Location
    province: "",
    district: "",
    ward: "",
    dataProvince: [],
    dataDistrict: [],
    dataWard: [],
    loadingDataLocation: false,
    error: "",
    // Receiver
    receiverFullName: "",
    receiverAddress: "",
    receiverPhone: null,
    receiverProvince: "",
    receiverDistrict: "",
    receiverWard: "",
    receiverTaxAddress: "",
    receiverDataDistrict: [],
    receiverDataWard: []
}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        toggleChangeValue: <K extends keyof CheckoutState>(
            state: Draft<CheckoutState>,
            action:PayloadAction<{
                key: keyof CheckoutState;
                value: CheckoutState[K]
            }>
        ) => {
            const {key,value} = action.payload;
            state[key] = value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListProvince.pending, (state) => {
                state.loadingDataLocation = true
            })
            .addCase(fetchListProvince.fulfilled, (state,action) => {
                state.dataProvince = action.payload.data;
                state.loadingDataLocation = false
            })
            .addCase(fetchListProvince.rejected, (state) => {
                state.loadingDataLocation = false
            })
        builder
            .addCase(fetchListDistrict.pending, (state) => {
                state.loadingDataLocation = true
            })
            .addCase(fetchListDistrict.fulfilled, (state,action) => {
                const {data,form} = action.payload;
                state.loadingDataLocation = false;
                if (form === "form1") {
                    state.dataDistrict = data.data
                } else {
                    state.receiverDataDistrict = data.data
                }
            })
            .addCase(fetchListDistrict.rejected, (state) => {
                state.loadingDataLocation = true
            })
        builder
            .addCase(fetchListWard.pending, (state) => {
                state.loadingDataLocation = true
            })
            .addCase(fetchListWard.fulfilled, (state,action) => {
                state.loadingDataLocation = false;
                const {data,form} = action.payload;
                if (form === "form1") {
                    state.dataWard = data.data
                } else {
                    state.receiverDataWard = data.data
                }
            })
            .addCase(fetchListWard.rejected, (state) => {
                state.loadingDataLocation = true;
            })
    }
})
export const {toggleChangeValue} = checkoutSlice.actions;
export default checkoutSlice.reducer;