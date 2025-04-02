import { Box, Button, CardMedia, Typography } from "@mui/material";
import React from "react";
import { BeautyifyBg } from "../../resources/js/images";

const BeautifyYourSpace = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap={{ md: "nowrap", xs: "wrap" }}
            p={{ xl: "7rem", md: "5rem", xs: "5rem" }}
            gap={"6rem"}
            sx={{
                background: "#F2F5FF",

                borderRadius: "8px",

                boxShadow: 2,
            }}
        >
            <Box width={{ lg: "30%" }}>
                <Typography
                    variant="h4"
                    sx={{ marginTop: "16px", fontWeight: "bold" }}
                >
                    Beautify Your Space
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ marginY: "8px", color: "#666", lineHeight: "39px" }}
                >
                    Do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                </Typography>
                <Button
                    variant="contained"
                    color={"primary"}
                    sx={{
                        width: { sm: "50%" },
                        borderRadius: "3rem",
                        backgroundColor: "#054C73",
                    }}
                >
                    Learn More
                </Button>
            </Box>
            <CardMedia
                component="img"
                image={BeautyifyBg}
                alt="Beautify Your Space"
                sx={{
                    borderRadius: "4px",
                    width: { xs: "50%", lg: "30%" },
                    height: "auto",
                }}
            />
        </Box>
    );
};

export default BeautifyYourSpace;
