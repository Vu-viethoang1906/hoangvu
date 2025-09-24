import { useKeycloak } from "@react-keycloak/web";

export const useAuth = () => {
  const { keycloak, initialized } = useKeycloak();

  const login = async () => {
    try {
      await keycloak.login();
      
      console.log("✅ Login thành công");
    } catch (error) {
      console.error("❌ Login thất bại:", error);
    }
   
  };

  const logout = async () => {
    try {
      await keycloak.logout({ redirectUri: window.location.origin });
      console.log("✅ Logout thành công");
    } catch (error) {
      console.error("❌ Logout thất bại:", error);
    }
  };

  return {
    initialized,
    authenticated: keycloak.authenticated,
    token: keycloak.token,
    username: keycloak.tokenParsed?.preferred_username,
    login,
    logout
  };
};
