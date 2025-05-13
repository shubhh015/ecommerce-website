import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/productSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {
        selectedProduct: product,
        loading,
        error,
    } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Products Not Found</Typography>;
    if (!product) return null;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                {/* Product Image */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={product.image.url}
                        alt={product.image.alt}
                        sx={{
                            width: "100%",
                            borderRadius: 3,
                            boxShadow: 2,
                            objectFit: "cover",
                            maxHeight: 400,
                        }}
                    />
                </Grid>

                {/* Product Info */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                        ₹{product.price}
                    </Typography>
                    <Box mb={2}>
                        {product.category.map((cat) => (
                            <Chip key={cat} label={cat} sx={{ mr: 1, mb: 1 }} />
                        ))}
                    </Box>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                    >
                        {product.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        variant="body2"
                        color={
                            product.inventory > 0
                                ? "success.main"
                                : "error.main"
                        }
                    >
                        {product.inventory > 0
                            ? `In Stock: ${product.inventory}`
                            : "Out of Stock"}
                    </Typography>
                    <Box mt={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={product.inventory === 0}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails;
