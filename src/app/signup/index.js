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
import {
    getPasswordHelperMessage,
    validateEmail,
    validatePhone,
    validateUsername,
} from "../../utils/validation";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "username":
                if (!validateUsername(value))
                    error =
                        "Username must be 3-15 characters (letters, numbers, _).";
                break;
            case "phone":
                if (!validatePhone(value))
                    error = "Enter a valid phone number.";
                break;
            case "email":
                if (!validateEmail(value))
                    error = "Enter a valid email address.";
                break;
            case "password":
                error = getPasswordHelperMessage(value);
                break;
            case "confirmPassword":
                if (value !== formData.password)
                    error = "Passwords do not match.";
                break;
            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const hasErrors =
        Object.values(errors).some((error) => error.length > 0) ||
        Object.values(formData).some((value) => value.length === 0);

    return (
        <Container
            maxWidth="sm"
            sx={{
                backgroundColor: "#F9FAF9",
                borderRadius: "8px",
                padding: "2rem",
                marginY: "2rem",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#054C73",
                    marginBottom: "2rem",
                    cursor: "pointer",
                }}
                onClick={() => navigate("/")}
            >
                Furniture
            </Typography>
            <Typography
                variant="h5"
                sx={{ marginBottom: "2rem", fontWeight: 700 }}
            >
                Sign Up
            </Typography>
            <form>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={{ marginBottom: "1rem" }}
                    required
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={{ marginBottom: "1rem" }}
                    required
                />
                <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
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
                    sx={{ marginBottom: "1rem" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
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
                <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    sx={{ marginBottom: "1rem" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                >
                                    {showConfirmPassword ? (
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
                <FormControlLabel
                    control={<Checkbox />}
                    label="I agree to the terms and conditions"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={hasErrors}
                    sx={{ marginBottom: "1rem", borderRadius: "20px" }}
                >
                    Sign Up
                </Button>
                <Box display="flex" justifyContent="flex-end">
                    <Typography variant="body2">
                        Already have an account?{" "}
                        <Link href="/login">Login</Link>
                    </Typography>
                </Box>
                <Box display="flex" gap={2} alignItems="center" sx={{ my: 2 }}>
                    <Divider sx={{ flex: 1 }} />
                    <Typography variant="body2">Or Continue With</Typography>
                    <Divider sx={{ flex: 1 }} />
                </Box>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            color="error"
                            sx={{ borderRadius: "30px", paddingY: "1rem" }}
                        >
                            <GoogleIcon fontSize="large" />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            sx={{ borderRadius: "30px", paddingY: "1rem" }}
                        >
                            <FacebookIcon fontSize="large" />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Signup;
