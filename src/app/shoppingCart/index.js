// Cart.js
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "./cartSlice";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch = useDispatch();

    return (
        <Container style={{ padding: "20px" }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <ShoppingCartIcon
                        style={{ fontSize: 60, marginBottom: 10 }}
                    />
                    <Typography variant="h6" component="p">
                        Your cart is empty.
                    </Typography>
                </Box>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <Box key={item.id} style={{ marginBottom: "10px" }}>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography>Price: ${item.price}</Typography>
                            <Typography>Quantity: {item.quantity}</Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                    dispatch(removeFromCart(item.id))
                                }
                            >
                                Remove
                            </Button>
                            <Divider style={{ margin: "15px 0" }} />
                        </Box>
                    ))}
                    <Typography variant="h6" component="h3">
                        Total Price: ${totalPrice.toFixed(2)}
                    </Typography>
                </>
            )}
        </Container>
    );
};

export default Cart;
