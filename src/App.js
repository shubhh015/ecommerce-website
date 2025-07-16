import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRoutes from "./Routes";
import Footer from "./shared/footer";
import Header from "./shared/header";
function App() {
    return (
        <>
            <BrowserRouter>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "120vh",
                    }}
                >
                    <CssBaseline />
                    <Header />
                    <Box sx={{ flexGrow: 2 }}>
                        <AppRoutes />
                    </Box>
                    <Footer />
                </Box>
            </BrowserRouter>
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
}

export default App;
