import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { fetchGetDataAddress, fetchListDistrict, fetchListProvince, fetchListWard } from "./checkoutApi";

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
    loadingDataAddress: boolean;
    error: string
    // Receiver
    receiverFullName: string,
    receiverPhone: number | null,
    receiverAddress:string,
    receiverProvince: string,
    receiverDistrict: string,
    receiverWard: string,
    receiverDataDistrict: unknown[],
    receiverDataWard: unknown[],
    // Checked
    isPaymentCheck: string
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
    loadingDataAddress: false,
    error: "",
    // Receiver
    receiverFullName: "",
    receiverAddress: "",
    receiverPhone: null,
    receiverProvince: "",
    receiverDistrict: "",
    receiverWard: "",
    receiverDataDistrict: [],
    receiverDataWard: [],
    // Checked
    isPaymentCheck: ""
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
            (state as any)[key] = value
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
                const {data} = action.payload;
                state.loadingDataLocation = false;
                state.dataDistrict = data.data
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
                const {data} = action.payload;
                state.dataWard = data.data
                
            })
            .addCase(fetchListWard.rejected, (state) => {
                state.loadingDataLocation = true;
            })
        builder
            .addCase(fetchGetDataAddress.pending, (state) => {
                state.loadingDataAddress = true
            })
            .addCase(fetchGetDataAddress.fulfilled, (state,action) => {
                state.loadingDataAddress = false;
                state.fullName= action.payload?.data.billingAddress?.fullname;
                state.address = action.payload?.data.billingAddress?.address;
                state.phone = action.payload?.data.billingAddress?.phone;
                state.email= action.payload?.data.billingAddress.email;
                state.receiverFullName = action.payload?.data.shippingAddress.fullname;
                state.receiverAddress = action.payload?.data.shippingAddress.address;
                state.receiverPhone = action.payload?.data.shippingAddress.phone;
                state.receiverProvince = action.payload?.data.shippingAddress.proviceId;
                state.receiverDistrict = action.payload?.data.shippingAddress.districtId;
                state.receiverWard = action.payload?.data.shippingAddress.wardId;
            })
    }
})
export const {toggleChangeValue} = checkoutSlice.actions;
export default checkoutSlice.reducer;