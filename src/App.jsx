import { Routes, Route, Navigate } from 'react-router-dom';

// import pages
import { Login, SignUp, Home } from './pages';

import { useUserContext } from './context/useUserContext';

function App() {
  const { user, authIsReady } = useUserContext();

  if (!authIsReady) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={<>{user ? <Home /> : <Navigate to="/login" />}</>}
      />
      <Route
        path="/login"
        element={<>{user ? <Navigate to="/" /> : <Login />}</>}
      />
      <Route
        path="/register"
        element={<>{user ? <Navigate to="/" /> : <SignUp />}</>}
      />
    </Routes>
  );
}

export default App;
