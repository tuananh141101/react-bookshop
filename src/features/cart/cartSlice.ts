import { toastUtils } from '../../common/utils/Toastutils';
import { typeProductInCart } from './../../common/constant/Constant';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    cart: typeProductInCart[],
    totalPrice: number | null,
    totalQuantity: number | null,
    isCheckOut: boolean,
    isCheckutSuccess: boolean
}

const initialState: CartState = {
    cart: [],
    totalPrice: null,
    totalQuantity: null,
    isCheckOut: false,
    isCheckutSuccess: false
}

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addToCart: (state,action:PayloadAction<typeProductInCart>) => {
            const find = state.cart.findIndex((item) => Number(item.id) === Number(action.payload.id));
            if (find >= 0) {
                state.cart[find].quantity += 1
            } else {
                state.cart.push(action.payload);
            }
            toastUtils.success(`Add book: ${action.payload.name} to cart`);
        },
        removeCart: (state,action:PayloadAction<typeProductInCart>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
            toastUtils.success(`Remove book: ${action.payload.name}`);

        },
        removeAllCart: (state) => {state.cart = []},
        increaseItemQuantity: (state, action:PayloadAction<typeProductInCart>) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    return {...item, quantity: item.quantity + 1};
                }
                return item
            })
        },
        decreaseItemQuantity: (state,action:PayloadAction<typeProductInCart>) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    return {...item, quantity: item.quantity - 1};
                }
                return item
            })
            .filter((item) => item.quantity > 0); //Remove product qty = 0
        }
    }
})


export const {
    addToCart,
    removeCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeAllCart
} = cartSlice.actions
export default cartSlice.reducer;