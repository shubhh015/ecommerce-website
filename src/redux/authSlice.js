import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: { email: "test@example.com", password: "Test@1234" },
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, password } = action.payload;
            if (
                email === state.user.email &&
                password === state.user.password
            ) {
                state.isAuthenticated = true;
                state.error = null;
            } else {
                state.isAuthenticated = false;
                state.error = "Invalid email or password.";
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
