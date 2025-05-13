import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    addOrUpdateCartItem,
    fetchCart,
    guestAddOrUpdateCartItem,
    guestRemoveCartItem,
    removeCartItem,
} from "../../redux/cartSlice";
import { fetchProductById } from "../../redux/productSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {
        selectedProduct: product,
        loading,
        error,
    } = useSelector((state) => state.products);

    const cartItems = useSelector((state) => state.cart.items);
    const isAuthenticated = useSelector((state) => !!state.auth.token);
    const navigate = useNavigate();
    const productInCart = cartItems.find(
        (item) => item.product?._id === product?._id
    );
    const quantity = productInCart ? productInCart.quantity : 0;

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const handleAddToCart = async () => {
        if (!product) return;
        if (quantity >= product.inventory) {
            toast.info("Cannot add more than available stock");
            return;
        }
        if (isAuthenticated) {
            try {
                const resultAction = await dispatch(
                    addOrUpdateCartItem({
                        product: product,
                        quantity: quantity + 1,
                    })
                );
                if (addOrUpdateCartItem.rejected.match(resultAction)) {
                    toast.error("Failed to add to cart");
                } else {
                    dispatch(fetchCart());
                }
            } catch (error) {
                toast.error("An error occurred while adding to cart");
            }
        } else {
            dispatch(
                guestAddOrUpdateCartItem({
                    product,
                    quantity: quantity + 1,
                })
            );
        }
    };

    const handleRemoveFromCart = async () => {
        if (!product) return;
        if (isAuthenticated) {
            try {
                if (quantity > 1) {
                    const resultAction = await dispatch(
                        addOrUpdateCartItem({
                            product: product,
                            quantity: quantity - 1,
                        })
                    );
                    if (addOrUpdateCartItem.rejected.match(resultAction)) {
                        toast.error("Failed to update cart");
                    } else {
                        dispatch(fetchCart());
                    }
                } else if (quantity === 1) {
                    const resultAction = await dispatch(
                        removeCartItem(product?._id)
                    );
                    if (removeCartItem.rejected.match(resultAction)) {
                        toast.error("Failed to remove item");
                    } else {
                        dispatch(fetchCart());
                    }
                }
            } catch (error) {
                toast.error("An error occurred while updating the cart");
            }
        } else {
            if (quantity > 1) {
                dispatch(
                    guestAddOrUpdateCartItem({
                        product,
                        quantity: quantity - 1,
                    })
                );
            } else if (quantity === 1) {
                dispatch(guestRemoveCartItem(product._id));
            }
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Products Not Found</Typography>;
    if (!product) return null;

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <IconButton
                onClick={() => navigate(-1)}
                sx={{ mb: 2 }}
                aria-label="Go back"
            >
                <ArrowBackIcon />
            </IconButton>
            <Grid container spacing={4}>
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
                        {product.inventory === 0 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled
                            >
                                Out of Stock
                            </Button>
                        ) : quantity === 0 ? (
                            <IconButton
                                onClick={handleAddToCart}
                                color="primary"
                                size="large"
                                sx={{
                                    bgcolor: "#E1E1E1",
                                    "&:hover": { bgcolor: "#d5d5d5" },
                                }}
                            >
                                <ShoppingCartOutlinedIcon />
                            </IconButton>
                        ) : (
                            <Box display="flex" alignItems="center">
                                <IconButton
                                    onClick={handleRemoveFromCart}
                                    color="secondary"
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="body1" mx={1}>
                                    {quantity}
                                </Typography>
                                <IconButton
                                    onClick={handleAddToCart}
                                    color="primary"
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails;
