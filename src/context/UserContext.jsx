import { createContext, useEffect, useReducer } from 'react';

import { projectAuth } from '../firebase/config';

export const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
      };
    case 'AUTH_IS_READY':
      return {
        ...state,
        authIsReady: true,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        authIsReady: true,
      };
    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    projectAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'LOGIN_USER', payload: user });
        return;
      }
      dispatch({ type: 'AUTH_IS_READY' });
    });
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
