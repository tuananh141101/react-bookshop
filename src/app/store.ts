import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import productSlice from "../features/products/productSlice";
import blogSlice from "../features/blog/blogSlice";
import commemtSlice from "../features/comments/commentSlice";
import filterSlice  from "../features/filter/filterSlice";
import cartSlice from "../features/cart/cartSlice";
import checkoutSlice from "../features/checkout/checkoutSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["cartStore"],
};

const rootReducer = combineReducers({
    productStore: productSlice,
    blogStore: blogSlice,
    commentStore: commemtSlice,
    filterStore: filterSlice,
    cartStore: cartSlice,
    checkoutStore: checkoutSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export const persistor = persistStore(store);

// Tạo kiểu AppDispatch từ store
export type AppDispatch = typeof store.dispatch;
// Lấy kiểu RootState từ store
export type RootState = ReturnType<typeof store.getState>;

