import { useState } from 'react';
import { projectAuth } from '../firebase/config';

import { useUserContext } from '../context/useUserContext';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useUserContext();

  const loginUser = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const { user } = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (!user) {
        throw new Error('Could not login user, please check your details.');
      }

      dispatch({ type: 'LOGIN_USER', payload: user });

      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { loginUser, isLoading, error };
};

export default useLogin;
