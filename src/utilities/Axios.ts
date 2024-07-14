import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:5058/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: () => true,
});
