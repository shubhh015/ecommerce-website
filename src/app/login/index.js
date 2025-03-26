import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { validateEmail } from "../../utils/validation";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = "";
        if (name === "email" && !validateEmail(value)) {
            error = "Enter a valid email address.";
        }
        if (name === "password") {
            error =
                "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.";
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };
    const isFormValid =
        !errors.email &&
        !errors.password &&
        formData.email &&
        formData.password;

    return (
        <Container
            maxWidth="sm"
            sx={{
                marginTop: "5rem",
                backgroundColor: "#F9FAF9",
                borderRadius: "8px",
                padding: "3rem",
            }}
        >
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#054C73",
                    textDecoration: "none",
                    marginBottom: "2rem",
                }}
                onClick={() => navigate("/")}
            >
                Furniture
            </Typography>

            <Typography
                variant="h5"
                component="h1"
                sx={{ marginBottom: "2rem", fontWeight: 700 }}
            >
                Sign in
            </Typography>
            <form>
                <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    variant="outlined"
                    sx={{ marginBottom: "1rem" }}
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText="Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number."
                    variant="outlined"
                    sx={{ marginBottom: "1rem" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    required
                />
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isFormValid}
                    onClick={handleSubmit}
                    sx={{ marginBottom: "1rem", borderRadius: "20px" }}
                >
                    Sign in
                </Button>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ marginBottom: "1rem" }}
                >
                    <Link href="#" variant="body2">
                        Forgot Password?
                    </Link>
                    <Typography variant="body2">
                        Don’t have an account?{" "}
                        <Link href="/signup" variant="body2">
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
                <Box display="flex" gap={2} alignItems="center" sx={{ my: 4 }}>
                    <Divider sx={{ flex: 1 }} />
                    <Typography variant="body2">Or Continue With</Typography>
                    <Divider sx={{ flex: 1 }} />
                </Box>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            color="error"
                            sx={{ borderRadius: "30px", paddingY: "1rem" }}
                            aria-label="Continue with Google"
                        >
                            <GoogleIcon fontSize="large" />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            sx={{ borderRadius: "30px", paddingY: "1rem" }}
                            aria-label="Continue with Facebook"
                        >
                            <FacebookIcon fontSize="large" />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;
