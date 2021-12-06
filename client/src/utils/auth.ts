import { User } from './types';

/**
 * Read the information from jwt and return a json with the token info
 */
export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

/**
 * Check if the given token has a exp valid value
 */
export const isTokenValid = (token: string) => {
  const { expiresAt } = parseJwt(token);

  return new Date() < new Date(expiresAt);
};

/**
 * Get the necessary user info
 */
export const getUserInfoFromToken = (token: string): User => {
  const { email, name } = parseJwt(token);
  const userInfo = { email, name };

  return userInfo;
};
