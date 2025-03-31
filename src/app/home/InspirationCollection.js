import { Box, Typography } from "@mui/material";
import React from "react";

const InspirationCollection = ({ title, description, items }) => {
    return (
        <Box sx={{ p: 4, bgcolor: "#F9F9F9" }}>
            <Typography
                variant="h4"
                align="center"
                fontWeight={"600"}
                gutterBottom
            >
                {title}
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 4 }}>
                {description}
            </Typography>

            <Box
                container
                spacing={1}
                display={"flex"}
                paddingX={"4rem"}
                justifyContent="center"
                alignItems={"center"}
                gap="2rem"
            >
                {items.map((item, index) => (
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        key={index}
                    >
                        <img src={item.img} alt={item.alt} width={"100%"} />
                        {item.desc && (
                            <Typography
                                variant="body1"
                                align="center"
                                fontWeight={"600"}
                                sx={{ my: 2 }}
                            >
                                {item.desc}
                            </Typography>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default InspirationCollection;
