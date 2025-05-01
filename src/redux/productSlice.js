import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/api/axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ keyword = "", category = "" }, thunkAPI) => {
        try {
            const params = {};
            if (keyword) params.keyword = keyword;
            if (category) params.category = category;
            const response = await axios.get("/products", { params });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (productData, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("/products", productData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, updates }, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`/products/${id}`, updates, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Delete product
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return id;
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
            })

            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                const idx = state.products.findIndex(
                    (p) => p._id === action.payload._id
                );
                if (idx !== -1) state.products[idx] = action.payload;
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (p) => p._id !== action.payload
                );
            });
    },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
