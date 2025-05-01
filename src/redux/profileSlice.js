import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/api/axios";

// Fetch user profile
export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.get("/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch profile"
            );
        }
    }
);

// Update user profile
export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (profileData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.put("/profile", profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update profile"
            );
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfileError: (state) => {
            state.error = null;
        },
        clearProfileSuccess: (state) => {
            state.success = false;
        },
        resetProfile: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Profile
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { clearProfileError, clearProfileSuccess, resetProfile } =
    profileSlice.actions;
export default profileSlice.reducer;
