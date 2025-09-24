import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactKeycloakProvider } from '@react-keycloak/web';

import keycloak from '../src/keycloack/Keycloak';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const eventLogger = (event: string, error: any) => {
  console.log("Keycloak Event:", event, error);
};
const tokenLogger = (tokens: any) => {
  console.log("Keycloak Tokens:", tokens);
  if(tokens){
    localStorage.setItem("SSOToken",tokens.refreshToken);
    localStorage.setItem("token",tokens.token);
     localStorage.setItem("Type_login", "SSO");
  }
};

root.render(
  <ReactKeycloakProvider 
    authClient={keycloak}
    onEvent={eventLogger}
    onTokens={tokenLogger}
    initOptions={{ onLoad: 'check-sso', 
    checkLoginIframe: false ,
    redirectUri: "http://localhost:3000/login",


    }}

   >
    <App />
  </ReactKeycloakProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
