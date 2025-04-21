// cartSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/api/axios";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch cart"
            );
        }
    }
);

export const addOrUpdateCartItem = createAsyncThunk(
    "cart/addOrUpdateItem",
    async ({ productId, quantity, price, imageUrl }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "/cart/item",
                { productId, quantity, price, imageUrl },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update cart"
            );
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeItem",
    async (productId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`/cart/item/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to remove item"
            );
        }
    }
);

export const emptyCart = createAsyncThunk(
    "cart/emptyCart",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete("/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to empty cart"
            );
        }
    }
);

export const updateShipping = createAsyncThunk(
    "cart/updateShipping",
    async (shippingCost, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(
                "/cart/shipping",
                { shippingCost },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update shipping"
            );
        }
    }
);

const initialState = {
    items: [],
    subTotal: 0,
    shippingCost: 0,
    status: "idle",
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.items;
                state.subTotal = action.payload.subTotal;
                state.shippingCost = action.payload.shippingCost;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(addOrUpdateCartItem.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.subTotal = action.payload.subTotal;
            })

            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.subTotal = action.payload.subTotal;
            })

            .addCase(emptyCart.fulfilled, (state) => {
                state.items = [];
                state.subTotal = 0;
                state.shippingCost = 0;
            })

            .addCase(updateShipping.fulfilled, (state, action) => {
                state.shippingCost = action.payload.shippingCost;
            });
    },
});

export default cartSlice.reducer;
