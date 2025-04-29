import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/api/axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ keyword = "", category = "" }, thunkAPI) => {
        try {
            const params = {};
            if (keyword) params.keyword = keyword;
            if (category) params.category = category;

            const response = await axios.get("/products", {
                params,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    products: [],
    categories: ["Best Seller", "Chair", "Table", "Bed", "Closet"],
    searchQuery: "",
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to fetch products";
            });
    },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
