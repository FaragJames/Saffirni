import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Bounce, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Test2 from "./testing/Test2.tsx";

function toastOptions(): ToastOptions {
    const toastOptions: ToastOptions = {};
    toastOptions.autoClose = 5000;
    toastOptions.pauseOnFocusLoss = true;
    toastOptions.pauseOnHover = true;
    toastOptions.position = "bottom-right";
    toastOptions.closeButton = true;
    toastOptions.rtl = true;
    toastOptions.theme = "colored";
    toastOptions.transition = Bounce;

    return toastOptions;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {!true && <App />}
        <Test2 />
        <ToastContainer {...toastOptions()} />
    </React.StrictMode>
);
