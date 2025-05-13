import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/api/axios";

export const fetchAddresses = createAsyncThunk(
    "address/fetchAddresses",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.get("/addresses", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch addresses"
            );
        }
    }
);

export const addAddress = createAsyncThunk(
    "address/addAddress",
    async (data, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.post("/addresses", data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to add address"
            );
        }
    }
);

// Update address
export const updateAddress = createAsyncThunk(
    "address/updateAddress",
    async ({ addressId, ...data }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.put(`/addresses/${addressId}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update address"
            );
        }
    }
);

// Delete address
export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async (addressId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.delete(`/addresses/${addressId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to delete address"
            );
        }
    }
);

const addressSlice = createSlice({
    name: "address",
    initialState: { addresses: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload;
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addresses = action.payload;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.addresses = action.payload;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addresses = action.payload;
            });
    },
});

export default addressSlice.reducer;
