import { useEffect, useReducer, useState } from 'react';
import { projectFirestore } from '../firebase/config';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'DELETED_DOCUMENT':
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const collectionRef = projectFirestore.collection(collection);

  const addDocument = async (docData) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const addedDocument = await collectionRef.add({
        ...docData,
      });
      if (!isCancelled) {
        dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    }

    console.log(response);
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { response, addDocument };
};

export default useFirestore;
