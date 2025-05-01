import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/api/axios";

export const createOrder = createAsyncThunk(
    "payment/createOrder",
    async ({ amount, currency, receipt, products }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "/payment/orders",
                {
                    amount,
                    currency,
                    receipt,
                    products,
                },
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    paymentMethod: "Credit Card",
    paymentStatus: null,
    order: null,
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        setPaymentStatus: (state, action) => {
            state.paymentStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.order = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPaymentMethod, setPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
