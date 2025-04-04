// ProductCard.js
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import React from "react";

const ProductCard = ({ title, imageUrl, price }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={title}
                sx={{
                    objectFit: "cover",
                }}
            />
            <CardContent>
                <Typography variant="h6" fontWeight={"600"} component="div">
                    {title}
                </Typography>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography variant="body1" color="text.secondary">
                        ${price}
                    </Typography>
                    <IconButton color="black" sx={{ bgcolor: "#E1E1E1" }}>
                        <ShoppingCartOutlinedIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
