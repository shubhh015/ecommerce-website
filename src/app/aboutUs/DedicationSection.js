import BuildIcon from "@mui/icons-material/Build";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const ratings = [
    { title: "Quality", value: 4.9 },
    { title: "Customer Satisfaction", value: 4.6 },
];

const DedicationSection = () => {
    return (
        <Box
            sx={{
                padding: 4,
                backgroundColor: "#000",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 5,
            }}
        >
            <Box width={"90%"}>
                <Typography
                    variant="h3"
                    fontWeight={"500"}
                    marginY={3}
                    gutterBottom
                >
                    Our Dedication to Your Satisfaction
                </Typography>
                <Typography variant="body1" marginY={3} gutterBottom>
                    We take pride in our unwavering commitment to quality and
                    customer satisfaction. With a track record of excellence, we
                    provide you with the finest furniture and a service you can
                    trust.
                </Typography>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={5}
                    marginY={5}
                >
                    {ratings.map((rating, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            key={index}
                            textAlign="center"
                        >
                            <Typography variant="h6" gutterBottom>
                                <Box
                                    display={"flex"}
                                    gap={1}
                                    alignItems={"center"}
                                >
                                    <StarIcon sx={{ color: "#FFD700" }} />
                                    <StarIcon sx={{ color: "#FFD700" }} />
                                    <StarIcon sx={{ color: "#FFD700" }} />
                                    <StarIcon sx={{ color: "#FFD700" }} />
                                    <StarIcon sx={{ color: "#FFD700" }} />
                                </Box>
                                {" ".repeat(4)} {rating.value} / 5 rating
                                <br />
                                {rating.title}
                            </Typography>
                        </Grid>
                    ))}
                </Box>
            </Box>
            <Box display={"flex"} flexGrow={1} flexDirection={"column"} gap={3}>
                <Box display={"flex"} gap={3}>
                    <BuildIcon style={{ fontSize: 30 }} color="warning" />
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Quality Craftsmanship
                        </Typography>
                        <Typography>
                            Our furniture is meticulously handcrafted to stand
                            the test of time, ensuring it can be enjoyed for
                            generations to come.
                        </Typography>
                    </Box>
                </Box>
                <Box display={"flex"} gap={3}>
                    <ShoppingBasketIcon
                        color="warning"
                        style={{ fontSize: 30 }}
                    />
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Extensive Selection
                        </Typography>
                        <Typography>
                            Discover a wide variety of styles and options to
                            suit your unique preferences and needs.
                        </Typography>
                    </Box>
                </Box>
                <Box display={"flex"} gap={3}>
                    <VerifiedUserIcon
                        color="warning"
                        style={{ fontSize: 30 }}
                    />
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Dedicated Customer Support
                        </Typography>
                        <Typography>
                            Quickly navigate you and engage with your audience.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DedicationSection;
