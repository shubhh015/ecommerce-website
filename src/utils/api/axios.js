import axios from "axios";

const instance = axios.create({
    baseURL: "https://ecommerce-backend-n66a.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
