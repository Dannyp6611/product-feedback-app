import { useState } from 'react';
import { projectAuth } from '../firebase/config';

import { useUserContext } from '../context/useUserContext';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useUserContext();

  const registerUser = async (displayName, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const { user } = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!user) {
        throw new Error('Could not register user, please try again later.');
      }

      // update users display name
      await user.updateProfile({
        displayName,
      });

      dispatch({ type: 'REGISTER_USER', payload: user });

      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error.message);
    }
  };

  return { registerUser, isLoading, error };
};

export default useRegister;
