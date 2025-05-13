import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    Box,
    Button,
    Container,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    addOrUpdateCartItem,
    emptyCart,
    fetchCart,
    removeCartItem,
} from "../../redux/cartSlice";
import { createOrder, setPaymentStatus } from "../../redux/paymentSlice";
import AddressSelector from "./AddressSelector";
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.subTotal);
    const [addressOpen, setAddressOpen] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        const loadCart = async () => {
            const resultAction = await dispatch(fetchCart());
            if (fetchCart.rejected.match(resultAction)) {
                toast.error(
                    resultAction.payload?.message || "Failed to load cart"
                );
            }
        };
        loadCart();
    }, [dispatch]);
    const user = useSelector((state) => state.user);

    const openRazorpayCheckout = async () => {
        const amountInPaise = Math.round((totalPrice + shippingCost) * 100);

        const resultAction = await dispatch(
            createOrder({
                amount: amountInPaise / 100,
                currency: "INR",
                receipt: "receipt#123",
                products: cartItems,
            })
        );

        if (createOrder.fulfilled.match(resultAction)) {
            const orderData = resultAction.payload;

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                mode: "test",
                amount: orderData.razorpayOrder.amount,
                currency: orderData.razorpayOrder.currency,
                name: "Furniture",
                description: "Test Transaction",
                order_id: orderData.razorpayOrder.id,
                handler: function (response) {
                    alert(
                        "Payment successful: " + response.razorpay_payment_id
                    );
                    dispatch(setPaymentStatus("success"));
                    dispatch(emptyCart());
                },
                prefill: {
                    name: user?.name || "",
                    email: user?.email || "",
                    contact: user?.phone || "",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

            rzp.on("payment.failed", function (response) {
                alert("Payment failed: " + response.error.description);
                dispatch(setPaymentStatus("failed"));
            });
        } else {
            alert("Failed to create order. Try again later.");
        }
    };
    const [promoCode, setPromoCode] = useState("");
    const [shippingCost, setShippingCost] = useState(5);

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return;

        dispatch(
            addOrUpdateCartItem({
                product: item?.product,
                quantity: newQuantity,
            })
        ).then(() => dispatch(fetchCart()));
    };

    const handleRemove = (item) => {
        const productId = item.product?._id;
        dispatch(removeCartItem(productId));
    };
    const handleCheckout = () => setAddressOpen(true);

    const handleAddressSelect = (addressId) => {
        setSelectedAddressId(addressId);
        setAddressOpen(false);
        openRazorpayCheckout();
    };
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Container style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            <Divider sx={{ mb: 5 }} />

            {cartItems.length === 0 ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <ShoppingCartIcon
                        style={{ fontSize: 60, marginBottom: 10 }}
                    />
                    <Typography variant="h6">Your cart is empty.</Typography>
                </Box>
            ) : (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    flexDirection={{ md: "column", lg: "row" }}
                    mb={3}
                >
                    <Box flex={2} mr={4} minWidth={300} mb={3}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ textWrap: "nowrap" }}
                                        >
                                            Product Details
                                        </TableCell>
                                        <TableCell align="center">
                                            Quantity
                                        </TableCell>
                                        <TableCell align="center">
                                            Price
                                        </TableCell>
                                        <TableCell align="center">
                                            Total
                                        </TableCell>
                                        <TableCell align="center">
                                            Remove
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow key={item.product?._id}>
                                            <TableCell>
                                                <Box
                                                    component="img"
                                                    src={
                                                        item?.product?.image
                                                            ?.url
                                                    }
                                                    alt={
                                                        item?.product?.image
                                                            ?.alt
                                                    }
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontWeight="bold">
                                                    {item?.product?.name}
                                                </Typography>
                                                {item.platform && (
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {item.platform}
                                                    </Typography>
                                                )}
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    ${item.price?.toFixed(2)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <Typography sx={{ mx: 2 }}>
                                                        {item.quantity}
                                                    </Typography>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                ${item.price?.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="right">
                                                $
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="text"
                                                    color="error"
                                                    onClick={() =>
                                                        handleRemove(item)
                                                    }
                                                >
                                                    <ClearIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box
                        flex={1}
                        sx={{
                            border: "1px solid #ddd",
                            p: 3,
                            borderRadius: 1,
                            minWidth: 280,
                            mt: { xs: 4, md: 0 },
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mb={1}
                            fontWeight="medium"
                        >
                            <Typography>Items ({totalItems})</Typography>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mb={1}
                        >
                            <Typography>Subtotal</Typography>
                            <Typography>${totalPrice.toFixed(2)}</Typography>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mb={1}
                        >
                            <Typography>Tax</Typography>
                            <Typography>${shippingCost.toFixed(2)}</Typography>
                        </Box>
                        <Box
                            my={2}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <TextField
                                size="small"
                                label="Promo Code"
                                fullWidth
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                sx={{ mr: 1 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ height: "40px" }}
                                onClick={() => alert("Promo code applied!")}
                            >
                                APPLY
                            </Button>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            fontWeight="bold"
                        >
                            <Typography>Total Cost</Typography>
                            <Typography>
                                ${(totalPrice + shippingCost).toFixed(2)}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={handleCheckout}
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                </Box>
            )}
            <Link variant="text" sx={{ mt: 2 }} to="/products">
                &larr; Continue Shopping
            </Link>
            <AddressSelector
                open={addressOpen}
                onClose={() => setAddressOpen(false)}
                onSelect={handleAddressSelect}
            />
        </Container>
    );
};

export default Cart;
