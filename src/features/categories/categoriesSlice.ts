import { createSlice  } from "@reduxjs/toolkit";
import { typeCategories } from "../../common/constant/Constant";
import { fetchCategories } from "./categoriesApi";

interface CategoriesState {
    listCategories: typeCategories[];
    loadingData: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    listCategories: [],
    loadingData: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loadingData = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loadingData = false;
                state.listCategories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.loadingData = false;
                state.error = "Something went wrong!";
            });
    },
});

export default categoriesSlice.reducer;
