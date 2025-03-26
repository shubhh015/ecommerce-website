import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentMethod: "Credit Card",
    paymentStatus: null,
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
});

export const { setPaymentMethod, setPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
