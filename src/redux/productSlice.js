// productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
    Fabric1,
    Fabric2,
    Fabric3,
    Sofa1,
    TableImg,
} from "../resources/js/images";

const initialState = {
    products: [
        {
            id: 1,
            name: "Sofa",
            price: 20000,
            category: "Furniture",
            stock: 10,
            imageUrl: Sofa1,
        },
        {
            id: 2,
            name: "Dining Table",
            price: 30000,
            category: "Furniture",
            stock: 5,
            imageUrl: TableImg,
        },
        {
            id: 3,
            name: "Fabric Chair",
            price: 95.0,
            category: "Furniture",
            stock: 20,
            imageUrl: Fabric1,
        },
        {
            id: 4,
            name: "Fabric Chair",
            price: 95.0,
            category: "Furniture",
            stock: 20,
            imageUrl: Fabric2,
        },
        {
            id: 5,
            name: "Fabric Chair",
            price: 95.0,
            category: "Furniture",
            stock: 20,
            imageUrl: Fabric3,
        },

        {
            id: 7,
            name: "Sofa",
            price: 95.0,
            category: "Furniture",
            stock: 20,
            imageUrl: Fabric2,
        },
    ],
    categories: ["Furniture", "Electronics", "Clothing"],
    searchQuery: "",
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
