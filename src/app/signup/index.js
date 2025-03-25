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

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

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
                Sign Up
            </Typography>
            <form>
                <TextField
                    fullWidth
                    label="Username"
                    type="text"
                    variant="outlined"
                    sx={{ marginBottom: "1rem" }}
                    required
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    variant="outlined"
                    sx={{ marginBottom: "1rem" }}
                    required
                />
                <TextField
                    fullWidth
                    label="E-mail"
                    type="email"
                    variant="outlined"
                    sx={{ marginBottom: "1rem" }}
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"} // Toggle password visibility
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
                <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                    variant="outlined"
                    sx={{ marginBottom: "1rem" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
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
                    sx={{
                        marginBottom: "1rem",
                        borderRadius: "20px", // Set the border radius for rounded corners
                    }}
                >
                    Sign Up
                </Button>
                <Box display="flex" justifyContent={"flex-end"}>
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        Already have an account?{" "}
                        <Link href="/login" variant="body2">
                            Login
                        </Link>
                    </Typography>
                </Box>
                {/* Divider Section */}
                <Box display="flex" gap={2} alignItems="center" sx={{ my: 2 }}>
                    <Divider sx={{ flex: 1 }} />
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                        Or Continue With
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                </Box>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            color="error"
                            sx={{
                                borderRadius: "30px",
                                paddingY: "1rem",
                            }}
                            aria-label="Continue with Google"
                        >
                            <GoogleIcon fontSize="large" />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            sx={{
                                borderRadius: "30px",
                                paddingY: "1rem",
                            }}
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

export default Signup;
