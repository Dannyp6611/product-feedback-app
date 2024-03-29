import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsubscribe = ref.onSnapshot(
      (document) => {
        if (document.data()) {
          setDocument({ ...document.data(), id: document.id });
          setError(null);
        } else {
          setError("Document doesn't exist");
        }
      },
      (error) => {
        setError('failed to get document');
        console.error(error.message);
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
