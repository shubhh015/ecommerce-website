import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AboutUs from "./app/aboutUs";
import Home from "./app/home";
import Login from "./app/login";
import ProductPage from "./app/product";
import Signup from "./app/signup";
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
                {routeConfigs.map(({ path, RenderComponent }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<RenderComponent />}
                    />
                ))}
                {/* <Redirect to={NOT_FOUND} /> */}
            </Routes>
        </>
    );
};

export default AppRoutes;
