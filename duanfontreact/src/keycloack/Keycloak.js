import Keycloak from 'keycloak-js' ; 

const keycloak = new Keycloak({
  url: 'https://id.dev.codegym.vn/auth', // URL Keycloak server
  realm: 'codegym-software-nhom-6',      // Realm
  clientId: 'Test-keyclock',               // Client ID
});

export default keycloak;
