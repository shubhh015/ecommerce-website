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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch = useDispatch();

    const [promoCode, setPromoCode] = useState("");
    const [shippingCost, setShippingCost] = useState(5);

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
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
                    {/* Left side: Cart Items in Table */}
                    <Box flex={2} mr={4} minWidth={300} mb={3}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                textWrap: "nowrap",
                                            }}
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
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Box
                                                    component="img"
                                                    src={item.image}
                                                    alt={item.name}
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontWeight="bold">
                                                    {item.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {item.platform}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    ${item.price.toFixed(2)}
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
                                                                item.id,
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
                                                                item.id,
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
                                                ${item.price.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="right">
                                                $
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() =>
                                                        dispatch(
                                                            removeFromCart(
                                                                item.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    Remove
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
                            <Typography>${totalPrice.toFixed(2)}</Typography>
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
                            onClick={() => alert("Proceeding to checkout")}
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                </Box>
            )}
            <Button variant="text" sx={{ mt: 2 }} href="/products">
                &larr; Continue Shopping
            </Button>
        </Container>
    );
};

export default Cart;
