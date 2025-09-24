import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import keycloak from "./keycloack/Keycloak";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Hàm xử lý sự kiện của Keycloak (không log ra nữa)
const eventLogger = () => {};

// Hàm xử lý token (chỉ lưu vào localStorage, không log)
const tokenLogger = (tokens: any) => {
  if (tokens?.token) {
    localStorage.setItem("token", tokens.token);
    localStorage.setItem("refreshToken", tokens.refreshToken || "");
    localStorage.setItem("Type_login", "SSO");
  } else {
    localStorage.clear();
  }
};

root.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    onEvent={eventLogger}
    onTokens={tokenLogger}
    initOptions={{
      onLoad: "check-sso",
      checkLoginIframe: false,
      redirectUri: "http://localhost:3000/dashboard",
    }}
  >
    <App />
  </ReactKeycloakProvider>
);

reportWebVitals();
