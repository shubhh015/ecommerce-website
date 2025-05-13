import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/api/axios";

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Login failed"
            );
        }
    }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async ({ name, phone, email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/auth/signup", {
                name,
                phone,
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Signup failed"
            );
        }
    }
);

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;

                state.user = {
                    _id: action.payload._id,
                    name: action.payload.name,
                    email: action.payload.email,
                    role: action.payload.role,
                };
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    _id: action.payload._id,
                    name: action.payload.name,
                    email: action.payload.email,
                };
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
