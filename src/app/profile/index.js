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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { fetchMyOrders } from "../../redux/orderSlice";
import { ROLE } from "../../utils/constants/role";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { orders, status } = useSelector((state) => state.orders);
    const navigate = useNavigate();
    const latestTwoOrders = orders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 2);
    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);
    console.log("two", orders);
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

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
                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <Button variant="outlined" startIcon={<EditIcon />}>
                                Edit Profile
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Stack>
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

            {user.role !== ROLE.ADMIN && (
                <Paper variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Recent Orders
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {status === "idle" ? (
                        <Typography color="text.secondary">
                            Loading orders...
                        </Typography>
                    ) : latestTwoOrders.length === 0 ? (
                        <Typography color="text.secondary">
                            No recent orders.
                        </Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {latestTwoOrders.map((order) => (
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
                                                        $
                                                        {order.price.toFixed(2)}
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
            )}
        </Container>
    );
};

export default ProfilePage;
