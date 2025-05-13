import { Box, Button, Typography } from "@mui/material";
import React from "react";

const NewCollectionSection = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingX: "3rem",
                height: { xs: "593px", sm: "593px", xl: "593px" },
                width: { lg: "539px" },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "1rem",
                    bgcolor: "#DFE9F4",
                    color: "#054C73",
                    padding: 4,
                }}
            >
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                    New Arrival
                </Typography>
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    gutterBottom
                >
                    Discover Our New Collection
                </Typography>
                <Typography variant="body2" color="black" mb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper mattis.
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
                    BUY NOW
                </Button>
            </Box>
        </Box>
    );
};

export default NewCollectionSection;
