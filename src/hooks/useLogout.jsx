import { useState } from 'react';
import { projectAuth } from '../firebase/config';

import { useUserContext } from '../context/useUserContext';

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useUserContext();

  const logoutUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await projectAuth.signOut();

      dispatch({ type: 'LOGOUT_USER' });

      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { logoutUser, isLoading, error };
};

export default useLogout;
