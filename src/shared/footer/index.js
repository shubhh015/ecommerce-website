import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Grid, Link, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const { pathname } = useLocation();
    return (
        <Box
            sx={{
                bgcolor: "#054C73",
                color: "white",
                padding: 5,
                display:
                    pathname.includes("/login") || pathname.includes("/signup")
                        ? "none"
                        : "block",
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Furniture
                    </Typography>
                    <Typography variant="body2">
                        We are a residential interior design firm located in
                        Portland. Our boutique studio offers more than
                    </Typography>
                    <Box
                        sx={{
                            marginTop: 2,
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <Link href="#" color="inherit">
                            <TwitterIcon />
                        </Link>
                        <Link href="#" color="inherit">
                            <FacebookIcon />
                        </Link>

                        <Link href="#" color="inherit">
                            <InstagramIcon />
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: "600" }}>
                        Services
                    </Typography>
                    <Typography variant="body2">Bonus program</Typography>
                    <Typography variant="body2">Gift cards</Typography>
                    <Typography variant="body2">Credit and payment</Typography>
                    <Typography variant="body2">Service contracts</Typography>
                    <Typography variant="body2">Non-cash account</Typography>
                    <Typography variant="body2">Payment</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography vvariant="body1" sx={{ fontWeight: "600" }}>
                        Assistance to the buyer
                    </Typography>
                    <Typography variant="body2">Find an order</Typography>
                    <Typography variant="body2">Terms of delivery</Typography>
                    <Typography variant="body2">
                        Exchange and return of goods
                    </Typography>
                    <Typography variant="body2">Guarantee</Typography>
                    <Typography variant="body2">
                        Frequently asked questions
                    </Typography>
                    <Typography variant="body2">
                        Terms of use of the site
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
