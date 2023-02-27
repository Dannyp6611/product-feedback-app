import { projectFirestore } from '../firebase/config';

import { useUserContext } from '../context/useUserContext';

const useFirestore = (collection) => {
  const { user } = useUserContext();

  const addFeedback = async (feedbackData) => {
    const response = await projectFirestore.collection(collection).add({
      ...feedbackData,
      userId: user.uid,
    });
    console.log(response);
  };

  return { addFeedback };
};

export default useFirestore;
