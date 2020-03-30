import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Button from '@material-ui/core/Button';

const LoginPage = () => {
  const [keycloak] = useKeycloak();
  return (
    <div>
      <div>
        <div>
          <div>{`User is ${
            !keycloak.authenticated ? 'NOT ' : ''
          }authenticated`}</div>

          {!!keycloak.authenticated && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => keycloak.logout()}
            >
              Logout
            </Button>
          )}
          {!keycloak.authenticated && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => keycloak.login()}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
