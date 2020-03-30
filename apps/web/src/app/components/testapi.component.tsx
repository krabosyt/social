import React from 'react';
import Button from '@material-ui/core/Button';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';

export default () => {
  const [keycloak] = useKeycloak();

  const makeRequest = () => {
    axios
      .get('http://localhost:4000/test', {
        headers: {
          Authorization: 'Bearer ' + keycloak.token
        }
      })
      .then(d => {
        console.log(d.data);
      });
  };

  return (
    <div>
      <Button onClick={makeRequest} variant="outlined" color="primary">
        Send request
      </Button>
    </div>
  );
};
