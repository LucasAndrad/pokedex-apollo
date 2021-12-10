import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from 'src/utils/constants';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($email: String!, $password: String!, $name: String) {
    createAccount(email: $email, password: $password, name: $name) {
      email,
      name,
      token
    }
  }
`;

type Props = {
  setUser: any;
}
export const CreateAccount = ({ setUser }: Props) => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const [createAccount, { data, loading, error }] = useMutation(CREATE_ACCOUNT_MUTATION);

  const onCreateAccount = () => {
    createAccount({ variables: { email, name, password } });
  };

  useEffect(() => {
    if (data && !error) {
      const { createAccount: { email, name, token } } = data;
      setUser({ email, name });
      localStorage.setItem(AUTH_TOKEN, token);
    }
  }, [data]);

  return (
    <div>
      <h6>Create Account</h6>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(event: any) => setEmail(event.target.value)}
      />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event: any) => setName(event.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event: any) => setPassword(event.target.value)}
      />
      {loading && <p>Loading</p>}

      <button onClick={onCreateAccount}>Create Account</button>
    </div>
  );
};
