import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import productSlice from "../features/products/productSlice";
import categoriesSlice from "../features/categories/categoriesSlice";
import blogStore from "../features/blog/blogSlice";

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
    whitelist: ["carts", "auths"],
};

const rootReducer = combineReducers({
    productStore: productSlice,
    categoriesStore: categoriesSlice,
    blogStore: blogStore,
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
