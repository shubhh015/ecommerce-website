import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
import { useDispatch, useSelector } from "react-redux";
import {
    addOrUpdateCartItem,
    fetchCart,
    removeCartItem,
} from "../../redux/cartSlice";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const productInCart = cartItems.find(
        (item) => item.product?._id === product?._id
    );
    const quantity = productInCart ? productInCart.quantity : 0;
    const isActive = product?.isActive ?? true;
    const handleAddToCart = () => {
        dispatch(
            addOrUpdateCartItem({
                product: product,
                quantity: quantity + 1,
            })
        ).then(() => dispatch(fetchCart()));
    };

    const handleRemoveFromCart = () => {
        if (quantity > 1) {
            dispatch(
                addOrUpdateCartItem({
                    product: product,
                    quantity: quantity - 1,
                })
            ).then(() => dispatch(fetchCart()));
        } else if (quantity === 1) {
            dispatch(removeCartItem(product?._id));
        }
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="200"
                image={product?.image?.url}
                alt={product?.image?.alt}
                sx={{ objectFit: "cover" }}
            />
            <CardContent>
                <Typography variant="h6" fontWeight={600} component="div">
                    {product?.name}
                </Typography>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="body1" color="text.secondary">
                        ${product?.price}
                    </Typography>
                    {!isActive ? (
                        <Typography
                            variant="body2"
                            color="error"
                            fontWeight={600}
                            sx={{ ml: 2 }}
                        >
                            Out of Stock
                        </Typography>
                    ) : quantity === 0 ? (
                        <IconButton
                            onClick={handleAddToCart}
                            color="primary"
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
                            <Typography variant="body1">{quantity}</Typography>
                            <IconButton
                                onClick={handleAddToCart}
                                color="primary"
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
