import { useEffect, useState } from 'react';
import { projectAuth, projectStorage } from '../firebase/config';

import { useUserContext } from '../context/useUserContext';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useUserContext();

  const registerUser = async (displayName, email, password, thumbnail) => {
    setIsLoading(true);
    setError(null);

    try {
      const { user } = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!user) {
        throw new Error('Could not register user.');
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgURL = await img.ref.getDownloadURL();

      // update users display name
      await user.updateProfile({
        displayName,
        photoURL: imgURL,
      });

      dispatch({ type: 'REGISTER_USER', payload: user });

      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { registerUser, isLoading, error };
};

export default useRegister;
