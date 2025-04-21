import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PendingIcon from "@mui/icons-material/Pending";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";

const orders = [
    {
        id: "ORD-1001",
        product: {
            name: "Modern Oak Dining Table",
            imageUrl:
                "https://dummyimage.com/120x80/cccccc/333333&text=Dining+Table",
        },
        date: "2025-04-19",
        price: 899.0,
        quantity: 1,
        status: "Delivered",
    },
    {
        id: "ORD-1002",
        product: {
            name: "Ergonomic Office Chair",
            imageUrl:
                "https://dummyimage.com/120x80/cccccc/333333&text=Office+Chair",
        },
        date: "2025-04-15",
        price: 299.0,
        quantity: 2,
        status: "Shipped",
    },
    {
        id: "ORD-1003",
        product: {
            name: "Luxury Floor Lamp",
            imageUrl:
                "https://dummyimage.com/120x80/cccccc/333333&text=Floor+Lamp",
        },
        date: "2025-04-10",
        price: 120.0,
        quantity: 1,
        status: "Processing",
    },
];

const statusIcon = (status) => {
    switch (status) {
        case "Delivered":
            return <CheckCircleIcon color="success" fontSize="small" />;
        case "Shipped":
            return <LocalShippingIcon color="primary" fontSize="small" />;
        default:
            return <PendingIcon color="warning" fontSize="small" />;
    }
};

const Orders = () => {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box display="flex" alignItems="center" mb={3}>
                <ShoppingCartIcon
                    color="primary"
                    sx={{ mr: 1, fontSize: 32 }}
                />
                <Typography variant="h4" fontWeight="bold">
                    My Orders
                </Typography>
            </Box>
            <Divider sx={{ mb: 4 }} />

            {orders.length === 0 ? (
                <Box textAlign="center" py={10}>
                    <Typography variant="h6" color="text.secondary">
                        You have no orders yet.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {orders.map((order) => (
                        <Grid item xs={12} key={order.id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        alignItems="center"
                                        spacing={2}
                                        justifyContent="space-between"
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            flex={2}
                                        >
                                            <Avatar
                                                variant="rounded"
                                                src={order.product.imageUrl}
                                                alt={order.product.name}
                                                sx={{
                                                    width: 80,
                                                    height: 60,
                                                    mr: 2,
                                                }}
                                            />
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                >
                                                    {order.product.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Order ID: {order.id}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Ordered on: {order.date}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box flex={1} textAlign="center">
                                            <Typography variant="body1">
                                                Qty: <b>{order.quantity}</b>
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="primary"
                                            >
                                                ${order.price.toFixed(2)}
                                            </Typography>
                                        </Box>
                                        <Box flex={1} textAlign="center">
                                            <Chip
                                                icon={statusIcon(order.status)}
                                                label={order.status}
                                                color={
                                                    order.status === "Delivered"
                                                        ? "success"
                                                        : order.status ===
                                                          "Shipped"
                                                        ? "primary"
                                                        : "warning"
                                                }
                                                variant="outlined"
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: 16,
                                                }}
                                            />
                                        </Box>
                                        <Box flex={1} textAlign="right">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                            >
                                                View Details
                                            </Button>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Orders;
