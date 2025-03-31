import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
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
});

export const { placeOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
