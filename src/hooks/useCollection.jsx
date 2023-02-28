import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const collectionRef = projectFirestore.collection(collection);

  useEffect(() => {
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const results = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setDocuments(results);
    });

    // update state
    setDocuments(null);
    setError(null);

    return () => unsubscribe();
  }, [collection]);

  return { documents, error };
};

export default useCollection;
