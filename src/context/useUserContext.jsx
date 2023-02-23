import { useContext } from 'react';

import { UserContext } from './UserContext';

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('user context can not be used outside of provider');
  }

  return context;
};
