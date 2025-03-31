import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    errorMessage: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
    },
});

export const { setLoading, setErrorMessage } = uiSlice.actions;
export default uiSlice.reducer;
