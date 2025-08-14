import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    minPrice: number;
    maxPrice: number;
    sortBy: string;
    cate: string[];
    author: string[];
    search: string;
}

const initialState: FilterState = {
    minPrice:0,
    maxPrice: 100,
    sortBy: "none",
    cate: [],
    author: [],
    search: ""
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        cateChecked: (state,action:PayloadAction<string>) => {
            state.cate.push(action.payload)
        },
        authorChecked: (state,action:PayloadAction<string>) => {
            state.author.push(action.payload)
        },
        removeCateAuthor: (state,action:PayloadAction<{key: 'cate' | 'author'; value:string}>) => {
            const {key,value} = action.payload;
            if (state[key].includes(value)) {
                state[key] = state[key].filter(item => item !== value); 
            }
        },
        toggleFilterValue: (state,action:PayloadAction<{key: 'cate' | 'author'; value:string}>) => {
            const {key,value} = action.payload;
            const index = state[key].indexOf(value);
            if (index >= 0) {
                state[key].splice(index,1); //remove
            } else {
                state[key].push(value)
            }
        },
        clearAllCate: (state) => {
            state.cate = []
            state.author = []
        },
        changeSearch: (state,action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        changePrice: (state, action:PayloadAction<{key: 'maxPrice' | 'minPrice'; value: number}>) => {
            const {key, value} = action.payload;
            state[key] = value;
        }
    }
})


export const {
    toggleFilterValue,
    cateChecked,
    authorChecked,
    removeCateAuthor,
    clearAllCate,
    changeSearch,
    changePrice
} = filterSlice.actions;
export default filterSlice.reducer;