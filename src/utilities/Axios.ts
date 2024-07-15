import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:5058/",
    timeout: 1000000,
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: () => true,
});
