// AppWrapper.tsx
import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import App from "./App";
import { useNavigate } from "react-router-dom";
const AppWrapper = () => {
  const { initialized, keycloak } = useKeycloak();
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized) return; // chờ Keycloak load xong

    if (keycloak?.authenticated || localStorage.getItem("token")) {
      // Đã login Keycloak hoặc Local JWT → vào Dashboard
      navigate("/dashboard");
    } else {
      // Chưa login → vào trang Login
      navigate("/login");
    }

    setReady(true); // bật render App
  }, [initialized, keycloak, navigate]);
  
  
  if (!ready) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Đang đăng nhập SSO...
      </div>
    );
  }

  return <App />;
};

export default AppWrapper;
