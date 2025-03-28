import { Box, Typography } from "@mui/material";
import React from "react";
import {
    Inspiration1,
    Inspiration2,
    Inspiration3,
} from "../../resources/js/images";

const InspirationCollection = () => {
    const items = [
        {
            img: Inspiration1,
            alt: "Inspiration 1",
        },
        {
            img: Inspiration2,
            alt: "Inspiration 2",
        },
        {
            img: Inspiration3,
            alt: "Inspiration 3",
        },
    ];

    return (
        <Box sx={{ p: 4, bgcolor: "#F9F9F9" }}>
            <Typography variant="h4" align="center" gutterBottom>
                Inspiration Collection
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 4 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>

            <Box
                container
                spacing={1}
                display={"flex"}
                paddingX={"4rem"}
                justifyContent="center"
                alignItems={"center"}
                gap="2"
            >
                {items.map((item, index) => (
                    <img
                        src={item.img}
                        alt={item.alt}
                        width={"30%"}
                        height={"100vh"}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default InspirationCollection;
