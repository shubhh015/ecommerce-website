import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "./addressSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import paymentReducer from "./paymentSlice";
import productReducer from "./productSlice";
import profileReducer from "./profileSlice";
import uiReducer from "./uiSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        orders: orderReducer,
        payment: paymentReducer,
        ui: uiReducer,
        profile: profileReducer,
        address: addressReducer,
    },
});

export default store;
