import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';

const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  console.log(orderBy.value);

  useEffect(() => {
    let collectionRef = projectFirestore.collection(collection);

    if (query) {
      collectionRef = collectionRef.where(...query);
    }

    if (orderBy) {
      collectionRef = collectionRef.orderBy(...orderBy);
    }

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
  }, [collection, query, orderBy]);

  return { documents, error };
};

export default useCollection;
