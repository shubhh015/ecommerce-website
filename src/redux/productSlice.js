import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        { id: 1, name: "Sofa", price: 20000, category: "Furniture", stock: 10 },
        {
            id: 2,
            name: "Dining Table",
            price: 30000,
            category: "Furniture",
            stock: 5,
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
