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
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import {
    addOrUpdateCartItem,
    fetchCart,
    guestAddOrUpdateCartItem,
    guestRemoveCartItem,
    removeCartItem,
} from "../../redux/cartSlice";
const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const isAuthenticated = useSelector((state) => !!state.auth.token);

    const navigate = useNavigate();

    const productInCart = cartItems.find(
        (item) => item.product?._id === product?._id
    );
    const quantity = productInCart ? productInCart.quantity : 0;
    const isActive = product?.isActive ?? true;

    const handleAddToCart = async () => {
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
                        toast.success("Removed from cart");
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
                toast.success("Removed from cart");
            }
        }
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="200"
                image={product?.image?.url}
                alt={product?.image?.alt}
                sx={{ objectFit: "cover", cursor: "pointer" }}
                onClick={() => navigate(`/products/${product._id}`)}
            />
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight={600}
                    component="div"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/products/${product._id}`)}
                >
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
                            onClick={async (e) => {
                                e.stopPropagation();
                                await handleAddToCart();
                            }}
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
