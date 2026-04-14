import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import "./App.css"

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
       <StrictMode>
         <App />
       </StrictMode>
    </BrowserRouter>,
);
