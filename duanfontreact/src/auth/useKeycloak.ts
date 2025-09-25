import { useKeycloak } from "@react-keycloak/web";

export const useAuth = () => {
  const { keycloak, initialized } = useKeycloak();

  // Đăng nhập
  const login = async () => {
    try {
      await keycloak.login();
      if (keycloak.token) {
        localStorage.setItem("token", keycloak.token);
        localStorage.setItem("refreshToken", keycloak.refreshToken || "");
        localStorage.setItem("Type_login", "SSO");
        return true;
      }
      return false;
    } catch (err) {
      console.error("❌ Login thất bại:", err);
      return false;
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      if (localStorage.getItem("Type_login") === "SSO") {
        await keycloak.logout({ redirectUri: window.location.origin });
      }
      localStorage.clear();
      console.log("✅ Logout thành công");
    } catch (err) {
      console.error("❌ Logout thất bại:", err);
    }
  };

  return {
    initialized,
    authenticated: keycloak.authenticated,
    token: keycloak.token,
    username: keycloak.tokenParsed?.preferred_username || "",
    login,
    logout,
  };
};