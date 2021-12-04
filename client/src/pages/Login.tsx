import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { CreateAccount } from 'src/components';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      error
    }
  }
`;

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const onLogin = () => {
    loginUser({ variables: { email, password } });
  };

  return (
    <div>
      <h6>Login</h6>
      <input
        type="email"
        value={email}
        onChange={(event: any) => setEmail(event.target.value)}
      />

      <input
        type="password"
        value={password}
        onChange={(event: any) => setPassword(event.target.value)}
      />

      <button onClick={onLogin}>Login</button>
      {loading && <p>Loading</p>}
      {/* {data && <p>Success: {data}</p>} */}

      <div style={{
        width: '100%', height: '1px', background: 'black', margin: '20px 0',
      }} />

      <CreateAccount />
    </div>
  );
};
