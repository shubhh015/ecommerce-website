import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/api/axios";

const initialState = {
    orders: [],
    status: "idle",
    error: null,
};

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("/orders", orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

// Async thunk to fetch logged-in user's orders
export const fetchMyOrders = createAsyncThunk(
    "orders/fetchMyOrders",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

// Async thunk to fetch a specific order by id
export const fetchOrderById = createAsyncThunk(
    "orders/fetchOrderById",
    async (orderId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message || err.message);
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        // You can keep these if you want to manually update orders locally
        placeOrder: (state, action) => {
            state.orders.push({ ...action.payload, status: "Processing" });
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            const order = state.orders.find((o) => o.id === orderId);
            if (order) {
                order.status = status;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(fetchMyOrders.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders = action.payload;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { placeOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
