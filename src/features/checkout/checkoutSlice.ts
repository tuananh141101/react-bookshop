import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    province: string,
    district: string,
    ward: string
}

const initialState: CheckoutState = {
    fullName: "nguyen tuan anh",
    address: "",
    phone: null,
    email: "",
    isDifferentBilling: false,
    billingAddress: "",
    billingFullName: "",
    billingPhone: null,
    province: "",
    district: "",
    ward: ""
}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        toggleChangeValue: <K extends keyof CheckoutState>(
            state: { [x: string]: string | number | boolean | null; },
            action:PayloadAction<{
                key: keyof CheckoutState;
                value: CheckoutState[K]
            }>
        ) => {
            const {key,value} = action.payload;
            state[key] = value
        }
    }
})
export const {toggleChangeValue} = checkoutSlice.actions;
export default checkoutSlice.reducer;