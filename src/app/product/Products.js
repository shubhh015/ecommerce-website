// App.js
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import TagList from "./TagList";
const Products = () => {
    const products = useSelector((state) => state.products.products);

    return (
        <Container sx={{ marginY: 2 }}>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Box>
                    <Typography
                        variant="body2"
                        bgcolor={"#F2F5FF"}
                        fontWeight={"600"}
                        padding={1}
                        width={{ md: "60%" }}
                        borderRadius={4}
                        marginBottom={2}
                        gutterBottom
                    >
                        Check Our Product
                    </Typography>

                    <Typography
                        variant="body1"
                        fontWeight={"700"}
                        marginLeft={1}
                        gutterBottom
                    >
                        Crafted with excellent material
                    </Typography>
                </Box>
                <Box>
                    <TagList />
                </Box>
            </Box>
            <Grid container spacing={2}>
                {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ProductCard {...product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Products;
