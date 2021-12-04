import React, { useState } from 'react';
import { CreateAccount } from 'src/components';

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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

      <button>Login</button>

      <div style={{
        width: '100%', height: '1px', background: 'black', margin: '20px 0',
      }} />

      <CreateAccount />
    </div>
  );
};
