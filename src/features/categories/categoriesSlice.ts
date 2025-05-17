import { createSlice  } from "@reduxjs/toolkit";
import { typeCategories, typeListCategories } from "../../common/constant/Constant";
import { fetchCategories, fetchListAllCategories } from "./categoriesApi";

interface CategoriesState {
    listCategories: typeCategories[];
    listAllCategories: typeListCategories[];
    loadingData: boolean;
    loadingDataAllCate: boolean;
    error: string | null;
    errorAllCate: string | null;
}

const initialState: CategoriesState = {
    listCategories: [],
    listAllCategories: [],
    loadingData: false,
    loadingDataAllCate: false,
    error: null,
    errorAllCate: null
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
        builder 
            .addCase(fetchListAllCategories.pending, (state) => {
                state.loadingDataAllCate = true;
                state.errorAllCate = null;
            })
            .addCase(fetchListAllCategories.fulfilled, (state,action) => {
                state.loadingDataAllCate = false;
                state.listAllCategories = action.payload;
            })
            .addCase(fetchListAllCategories.rejected, (state) => {
                state.loadingDataAllCate = true;
                state.error = "Something went wrong!";
            })
    },
});

export default categoriesSlice.reducer;
