import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Test1 from "./testing/Test1.tsx";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* <Provider store={store}>
        </Provider> */}
        {true && <App />}
    </React.StrictMode>
);
