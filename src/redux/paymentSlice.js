import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/api/axios";
export const createRazorpayOrder = createAsyncThunk(
    "payment/createRazorpayOrder",
    async ({ amount, currency }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/payment/razorpay-order", {
                amount,
                currency,
            });
            return response.data.razorpayOrder;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createOrder = createAsyncThunk(
    "payment/createOrder",
    async (
        {
            amount,
            currency,

            products,
            shippingAddress,
            isGuest = false,
        },
        { rejectWithValue }
    ) => {
        try {
            const token = localStorage.getItem("token");
            const endpoint = isGuest
                ? "/payment/guest/orders"
                : "/payment/orders";
            const response = await axios.post(
                endpoint,
                {
                    amount,
                    currency,

                    products,
                    shippingAddress,
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
    razorpayOrder: null,
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
        clearPayment: (state) => {
            state.paymentStatus = null;
            state.order = null;
            state.razorpayOrder = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRazorpayOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.razorpayOrder = null;
            })
            .addCase(createRazorpayOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.razorpayOrder = action.payload;
            })
            .addCase(createRazorpayOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
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

export const { setPaymentMethod, setPaymentStatus, clearPayment } =
    paymentSlice.actions;
export default paymentSlice.reducer;
