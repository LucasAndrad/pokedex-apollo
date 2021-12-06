import React from 'react';
import { User } from 'src/utils/types';

type Props = {
  user: User | null;
}

export const Header = ({ user }: Props) => {
  if (!user) return <></>;

  return (
    <p>{`Welcome: ${user?.name}`}</p>
  );
};
