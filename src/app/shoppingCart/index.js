// Cart.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "./cartSlice";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch = useDispatch();

    return (
        <div style={{ padding: "20px" }}>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item.id} style={{ marginBottom: "10px" }}>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button
                                onClick={() =>
                                    dispatch(removeFromCart(item.id))
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                </>
            )}
        </div>
    );
};

export default Cart;
