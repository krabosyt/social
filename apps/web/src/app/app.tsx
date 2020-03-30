import React from 'react';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from '../keycloak';
import LoginComponent from './components/login.component';
import { AppRouter } from './routes';

const keycloakProviderInitConfig: Keycloak.KeycloakInitOptions = {
  onLoad: 'check-sso'
};

export default () => {
  const onKeycloakTokens = tokens => {
    console.log('onKeycloakTokens', tokens);
  };
  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={keycloakProviderInitConfig}
      onTokens={onKeycloakTokens}
    >
      <AppRouter />
    </KeycloakProvider>
  );
};
