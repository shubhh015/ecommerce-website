import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart } from "../../redux/cartSlice";
import { fetchProducts } from "../../redux/productSlice";
import ProductCard from "./ProductCard";
import TagList from "./TagList";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [selectedTag, setSelectedTag] = useState("Best Seller");
    useEffect(() => {
        dispatch(fetchProducts({ category: selectedTag }));
    }, [dispatch, selectedTag]);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);
    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
    };
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
                    <TagList
                        selectedTag={selectedTag}
                        onTagSelect={handleTagSelect}
                    />
                </Box>
            </Box>

            {loading && <Typography>Loading products...</Typography>}
            {error && <Typography color="error">Error: {error}</Typography>}

            <Grid
                container
                spacing={2}
                justifyContent={{ xs: "center", lg: "initial" }}
            >
                {!loading &&
                    !error &&
                    products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default Products;
