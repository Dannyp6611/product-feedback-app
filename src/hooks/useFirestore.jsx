import { useEffect, useReducer, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

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
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
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
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await collectionRef.add({
        ...docData,
        createdAt,
      });
      if (!isCancelled) {
        dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    }
  };

  const updateDocument = async (docId, updates) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const updatedDocument = await collectionRef.doc(docId).update(updates);
      if (!isCancelled) {
        dispatch({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
      }
      return updatedDocument;
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
      return null;
    }
  };

  const deleteDocument = async (docId) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const deletedDocument = await collectionRef.doc(docId).delete();
      if (!isCancelled) {
        dispatch({ type: 'DELETED_DOCUMENT', payload: deletedDocument });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { response, addDocument, updateDocument, deleteDocument };
};

export default useFirestore;
