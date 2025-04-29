import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AboutUs from "./app/aboutUs";
import AdminDashboard from "./app/admin";
import Home from "./app/home";
import Login from "./app/login";
import Orders from "./app/orders";
import ProductPage from "./app/product";
import Profile from "./app/profile";
import Cart from "./app/shoppingCart";
import Signup from "./app/signup";
import { ROLE } from "./utils/constants/role";
import ProtectedRoute from "./utils/ProtectedRoute";
const routeConfigs = [
    {
        path: "/login",
        RenderComponent: Login,
        exact: true,
    },
    {
        path: "/signup",
        RenderComponent: Signup,
        exact: true,
    },
    {
        path: "/",
        RenderComponent: Home,
        exact: true,
    },
    {
        path: "/products",
        RenderComponent: ProductPage,
        exact: true,
    },
    {
        path: "/aboutUs",
        RenderComponent: AboutUs,
        exact: true,
    },
    {
        path: "/cart",
        RenderComponent: Cart,
        exact: true,
        isAuthReq: true,
        allowed: [ROLE.CONSUMER_USER],
    },
    {
        path: "/profile",
        RenderComponent: Profile,
        exact: true,

        isAuthReq: true,
        allowed: [ROLE.CONSUMER_USER, ROLE.ADMIN],
    },
    {
        path: "/orders",
        RenderComponent: Orders,
        exact: true,

        isAuthReq: true,
        allowed: [ROLE.CONSUMER_USER],
    },
    {
        path: "/admin/Dashboard",
        RenderComponent: AdminDashboard,
        exact: true,
        isAuthReq: true,
        allowed: [ROLE.ADMIN],
    },
];
export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {routeConfigs.map(
                    ({ path, RenderComponent, isAuthReq, allowed }) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                isAuthReq ? (
                                    <ProtectedRoute allowed={allowed}>
                                        <RenderComponent />
                                    </ProtectedRoute>
                                ) : (
                                    <RenderComponent />
                                )
                            }
                        />
                    )
                )}
            </Routes>
        </>
    );
};

export default AppRoutes;
