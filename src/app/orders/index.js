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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../../redux/orderSlice";

const statusIcon = (status) => {
    switch (status.toLowerCase()) {
        case "delivered":
            return <CheckCircleIcon color="success" fontSize="small" />;
        case "shipped":
            return <LocalShippingIcon color="primary" fontSize="small" />;
        case "paid":
        case "pending":
        case "processing":
            return <PendingIcon color="warning" fontSize="small" />;
        case "cancelled":
            return <PendingIcon color="error" fontSize="small" />;
        default:
            return <PendingIcon color="default" fontSize="small" />;
    }
};

const statusColor = (status) => {
    switch (status.toLowerCase()) {
        case "delivered":
            return "success";
        case "shipped":
            return "primary";
        case "paid":
        case "pending":
        case "processing":
            return "warning";
        case "cancelled":
            return "error";
        default:
            return "default";
    }
};

const capitalizeStatus = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.orders);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMyOrders());
        }
    }, [dispatch, status]);

    if (status === "loading") {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography>Loading orders...</Typography>
            </Container>
        );
    }

    if (status === "failed") {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography color="error">Error: {error}</Typography>
            </Container>
        );
    }

    if (orders.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Box textAlign="center" py={10}>
                    <Typography variant="h6" color="text.secondary">
                        You have no orders yet.
                    </Typography>
                </Box>
            </Container>
        );
    }

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

            <Grid container spacing={3}>
                {orders.map((order) => {
                    const item = order.items[0]; // Taking first item as example
                    return (
                        <Grid item xs={12} key={order._id}>
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
                                                src={
                                                    item.productId?.imageUrl ||
                                                    ""
                                                }
                                                alt={item.productId?.name || ""}
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
                                                    {item.productId?.name ||
                                                        "Unknown Product"}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Order ID: {order._id}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Ordered on:{" "}
                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box flex={1} textAlign="center">
                                            <Typography variant="body1">
                                                Qty: <b>{item.quantity}</b>
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="primary"
                                            >
                                                ${item.price.toFixed(2)}
                                            </Typography>
                                        </Box>
                                        <Box flex={1} textAlign="center">
                                            <Chip
                                                icon={statusIcon(
                                                    capitalizeStatus(
                                                        order.status
                                                    )
                                                )}
                                                label={capitalizeStatus(
                                                    order.status
                                                )}
                                                color={statusColor(
                                                    order.status
                                                )}
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
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Orders;
