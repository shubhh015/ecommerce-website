import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";

const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    address: "123 Maple Street, Springfield, USA",
    joined: "March 2022",
    recentOrders: [
        {
            id: "ORD-1001",
            product: "Modern Sofa",
            date: "2025-04-10",
            price: 499.99,
            status: "Delivered",
        },
        {
            id: "ORD-1002",
            product: "Oak Dining Table",
            date: "2025-03-28",
            price: 899.0,
            status: "Shipped",
        },
    ],
};

const ProfilePage = () => {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Card variant="outlined" sx={{ mb: 4 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            src={user.avatar}
                            alt={user.name}
                            sx={{ width: 80, height: 80 }}
                        />
                    }
                    action={
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            sx={{ mt: 2 }}
                        >
                            Edit Profile
                        </Button>
                    }
                    title={
                        <Typography variant="h5" fontWeight="bold">
                            {user.name}
                        </Typography>
                    }
                    subheader={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <EmailIcon color="action" fontSize="small" />
                            <Typography variant="body2">
                                {user.email}
                            </Typography>
                        </Stack>
                    }
                />
                <CardContent>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        mb={1}
                    >
                        <LocationOnIcon color="action" />
                        <Typography variant="body2" color="text.secondary">
                            Member since {user.joined}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>

            <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Recent Orders
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {user.recentOrders.length === 0 ? (
                    <Typography color="text.secondary">
                        No recent orders.
                    </Typography>
                ) : (
                    <Grid container spacing={2}>
                        {user.recentOrders.map((order) => (
                            <Grid item xs={12} md={6} key={order.id}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <ShoppingCartIcon color="primary" />
                                                <Box>
                                                    <Typography fontWeight="bold">
                                                        {order.product}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {order.date}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                            <Box textAlign="right">
                                                <Typography
                                                    color="primary"
                                                    fontWeight="bold"
                                                >
                                                    ${order.price.toFixed(2)}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color={
                                                        order.status ===
                                                        "Delivered"
                                                            ? "success.main"
                                                            : "warning.main"
                                                    }
                                                >
                                                    {order.status}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Paper>
        </Container>
    );
};

export default ProfilePage;
