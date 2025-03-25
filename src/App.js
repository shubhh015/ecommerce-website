import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./Routes";
import Footer from "./shared/footer";
import Header from "./shared/header";

function App() {
    return (
        <BrowserRouter>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <CssBaseline />
                <Header />
                <Box sx={{ flexGrow: 1 }}>
                    <AppRoutes />
                </Box>
                <Footer />
            </Box>
        </BrowserRouter>
    );
}

export default App;
