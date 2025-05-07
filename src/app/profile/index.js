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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../redux/authSlice";
import { fetchMyOrders } from "../../redux/orderSlice";
import { fetchProfile, resetProfile } from "../../redux/profileSlice";
import { ROLE } from "../../utils/constants/role";
import ChangePasswordModal from "./ChangePasswordModal";
import EditProfileModal from "./EditProfileModal";
const ProfilePage = () => {
    const dispatch = useDispatch();
    const [editOpen, setEditOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const resultAction = await dispatch(fetchProfile());
            if (fetchProfile.rejected.match(resultAction)) {
                toast.error("Failed to load profile");
            } else {
                toast.success("Profile loaded successfully");
            }
        };
        fetchData();
    }, [dispatch]);

    const user = useSelector((state) => state.profile?.user);

    const { orders, status } = useSelector((state) => state.orders);
    const navigate = useNavigate();
    const latestTwoOrders = orders
        ? [...orders]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 2)
        : [];

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetProfile());
        navigate("/login");
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Card variant="outlined" sx={{ mb: 4 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            src={user?.avatar || undefined}
                            alt={user?.name || ""}
                            sx={{ width: 80, height: 80 }}
                        >
                            {!user?.avatar && user?.name
                                ? user?.name.charAt(0).toUpperCase()
                                : null}
                        </Avatar>
                    }
                    action={
                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setEditOpen(true)}
                                startIcon={<EditIcon />}
                            >
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
                            {user?.name}
                        </Typography>
                    }
                    subheader={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <EmailIcon color="action" fontSize="small" />
                            <Typography variant="body2">
                                {user?.email}
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
                            Member since {user?.joined}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>

            {user?.role !== ROLE.ADMIN && (
                <Paper variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Recent Orders
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {status === "idle" ? (
                        <Typography color="text.secondary">
                            Loading orders...
                        </Typography>
                    ) : latestTwoOrders?.length === 0 ? (
                        <Typography color="text.secondary">
                            No recent orders.
                        </Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {latestTwoOrders.map((order) => (
                                <Grid item xs={12} md={6} key={order._id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Stack spacing={1}>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleString()}
                                                </Typography>

                                                {order.items.map((item) => (
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={2}
                                                        key={item._id}
                                                        sx={{ mb: 1 }}
                                                    >
                                                        <ShoppingCartIcon color="primary" />
                                                        <Box>
                                                            <Typography fontWeight="bold">
                                                                {item.name}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Quantity:{" "}
                                                                {item.quantity}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                Price: ₹
                                                                {item.price.toLocaleString()}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                ))}

                                                <Divider sx={{ my: 1 }} />
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    <Typography
                                                        color="primary"
                                                        fontWeight="bold"
                                                    >
                                                        Total: ₹
                                                        {order.totalAmount.toLocaleString()}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color={
                                                            order.status ===
                                                            "delivered"
                                                                ? "success.main"
                                                                : "warning.main"
                                                        }
                                                    >
                                                        {order.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            order.status.slice(
                                                                1
                                                            )}
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
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => setPasswordOpen(true)}
            >
                Change Password
            </Button>
            <ChangePasswordModal
                open={passwordOpen}
                onClose={() => setPasswordOpen(false)}
            />
            <EditProfileModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
            />
        </Container>
    );
};

export default ProfilePage;
