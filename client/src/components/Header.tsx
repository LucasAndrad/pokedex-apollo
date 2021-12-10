import React from 'react';
import { AUTH_TOKEN } from 'src/utils/constants';
import { User } from 'src/utils/types';

type Props = {
  user: User | null;
  setUser: (user: User | null) => void
}

export const Header = ({ user, setUser }: Props) => {
  if (!user) return <></>;

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setUser(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <p>{`Welcome: ${user?.name}`}</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
};
