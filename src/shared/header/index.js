import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCart } from "../../redux/cartSlice";
import { fetchProfile } from "../../redux/profileSlice";
import { ROLE } from "../../utils/constants/role";
const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [visible, setVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.profile?.user);

    React.useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchProfile());
        }
    }, [dispatch]);

    const pages = React.useMemo(() => {
        if (user?.role === ROLE.ADMIN && isAuthenticated) {
            return [
                { title: "Dashboard", path: "/admin/dashboard" },
                { title: "AboutUs", path: "/aboutUs" },
            ];
        } else if (isAuthenticated) {
            return [
                { title: "Products", path: "/products" },
                { title: "AboutUs", path: "/aboutUs" },
                { title: "Orders", path: "/orders" },
            ];
        } else {
            return [
                { title: "Products", path: "/products" },
                { title: "AboutUs", path: "/aboutUs" },
                { title: "Login", path: "/login" },
            ];
        }
    }, [user, isAuthenticated]);

    const { pathname } = useLocation();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            setVisible(false); // Scroll down
        } else {
            setVisible(true); // Scroll up
        }
        setLastScrollY(currentScrollY > 0 ? currentScrollY : 0);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);
    React.useEffect(() => {
        const loadCart = async () => {
            const resultAction = await dispatch(fetchCart());
            if (fetchCart.rejected.match(resultAction)) {
                toast.error(
                    resultAction.payload?.message || "Failed to load cart"
                );
            }
        };
        if (isAuthenticated && user?.role !== ROLE.ADMIN) {
            loadCart();
        }
    }, [dispatch]);
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems =
        cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
    return (
        <AppBar
            position="fixed"
            sx={{
                transform: visible ? "translateY(0)" : "translateY(-100%)",
                transition: "transform 0.3s ease",
                bgcolor: "white",
                display:
                    pathname.includes("/login") || pathname.includes("/signup")
                        ? "none"
                        : "contents",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="#054C73"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                                color: "#054C73",
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        navigate(page.path);
                                    }}
                                >
                                    <Typography sx={{ textAlign: "center" }}>
                                        {page.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "#054C73",
                            textDecoration: "none",
                        }}
                    >
                        Furniture
                    </Typography>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "#054C73",
                            textDecoration: "none",
                        }}
                    >
                        Furniture
                    </Typography>
                    <Box
                        sx={{
                            marginRight: 3,
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                        justifyContent={"end"}
                        alignItems={"center"}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => navigate(page.path)}
                                sx={{
                                    my: 2,
                                    color: "#054C73",
                                    display: "block",
                                }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    {user?.role !== ROLE.ADMIN && (
                        <Link to="/cart">
                            <IconButton color="primary">
                                <Badge
                                    badgeContent={totalItems}
                                    color="secondary"
                                    showZero
                                >
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Link>
                    )}

                    {isAuthenticated && (
                        <IconButton
                            color="primary"
                            size="large"
                            onClick={() => navigate("/profile")}
                        >
                            <AccountCircleIcon fontSize="large" />
                        </IconButton>
                    )}
                    {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography sx={{ textAlign: "center" }}>
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
