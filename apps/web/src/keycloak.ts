import Keycloak, { KeycloakConfig } from 'keycloak-js';

const config: KeycloakConfig = {
  clientId: 'frontend',
  realm: 'social-development',
  url: 'http://localhost:8080/auth/'
};

const keycloak = Keycloak(config);

export default keycloak;
