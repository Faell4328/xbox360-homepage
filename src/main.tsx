import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style/index.css";
import "./style/components/menu.css";
import "./style/components/notification.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
