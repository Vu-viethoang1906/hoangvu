import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppWrapper from "./AppWrapper";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloack/Keycloak";
import { BrowserRouter } from "react-router-dom"; //
const eventLogger = () => {};

const tokenLogger = (tokens: any) => {
  if (tokens?.token) {
    localStorage.setItem("token", tokens.token);
    localStorage.setItem("refreshToken", tokens.refreshToken || "");
    localStorage.setItem("Type_login", "SSO");
  } else {
    if (localStorage.getItem("Type_login") === "SSO") {
      localStorage.clear();
    }
  }
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
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
  <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </ReactKeycloakProvider>
);

reportWebVitals();
