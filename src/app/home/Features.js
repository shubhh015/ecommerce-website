import { Box, Typography } from "@mui/material";
import React from "react";
import { Allhour, shield, truck } from "../../resources/js/icons";

const Features = () => {
    const data = [
        {
            title: "Free Delivery",
            desc: "Lorem ipsum dolor sit amet.",
            img: truck,
        },
        {
            title: "Support 24/7",
            desc: "Lorem ipsum dolor sit amet.",
            img: Allhour,
        },
        {
            title: "100% Authentic",
            desc: "Lorem ipsum dolor sit amet.",
            img: shield,
        },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                bgcolor: "#F2F5FF",
                padding: 3,
            }}
        >
            {data.map((feature, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        gap: 1,
                    }}
                >
                    <img
                        src={feature.img}
                        alt={feature.title}
                        style={{ width: 50, height: 50 }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold", marginTop: 1 }}
                        >
                            {feature.title}
                        </Typography>
                        <Typography variant="caption" sx={{ marginTop: 0.5 }}>
                            {feature.desc}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default Features;
