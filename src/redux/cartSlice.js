// cartSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/api/axios";
const loadGuestCart = () => {
    try {
        const data = localStorage.getItem("guest_cart");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};
const saveGuestCart = (items) => {
    localStorage.setItem("guest_cart", JSON.stringify(items));
};

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
    async ({ product, quantity }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "/cart/item",
                { product, quantity },
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
export const fetchCartItemByProductId = createAsyncThunk(
    "cart/fetchCartItemByProductId",
    async (productId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`/cart/item/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { productId, cartItem: response.data };
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch cart item"
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
    reducers: {
        guestAddOrUpdateCartItem: (state, action) => {
            const { product, quantity } = action.payload;
            const idx = state.items.findIndex(
                (item) => item.product._id === product._id
            );
            if (quantity <= 0) {
                if (idx !== -1) state.items.splice(idx, 1);
            } else if (idx !== -1) {
                state.items[idx].quantity = quantity;
            } else {
                state.items.push({ product, quantity });
            }
            saveGuestCart(state.items);
        },
        guestRemoveCartItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.product._id !== action.payload
            );
            saveGuestCart(state.items);
        },
        guestClearCart: (state) => {
            state.items = [];
            saveGuestCart([]);
        },

        loadGuestCartFromStorage: (state) => {
            state.items = loadGuestCart();
        },
    },
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
            .addCase(fetchCartItemByProductId.fulfilled, (state, action) => {
                const { productId, cartItem } = action.payload;
                const index = state.items.findIndex(
                    (item) => item.product._id === productId
                );
                if (index > -1) {
                    state.items[index] = cartItem;
                } else {
                    state.items.push(cartItem);
                }
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
export const {
    guestAddOrUpdateCartItem,
    guestRemoveCartItem,
    guestClearCart,
    loadGuestCartFromStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
