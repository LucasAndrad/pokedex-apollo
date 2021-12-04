import React, { useState } from 'react';

export const CreateAccount = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

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

      <button>Create Account</button>
    </div>
  );
};
