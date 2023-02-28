import { Routes, Route, Navigate } from 'react-router-dom';

// import pages
import { Login, SignUp, Home, AddFeedback } from './pages';

import { useUserContext } from './context/useUserContext';
import SuggestionDetail from './pages/SuggestionDetail';

function App() {
  const { user, authIsReady } = useUserContext();

  console.log(user);

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
      <Route
        path="/add-feedback"
        element={<>{user ? <AddFeedback /> : <Navigate to="/login" />}</>}
      />
      <Route path="/suggestion/:id" element={<SuggestionDetail />} />
    </Routes>
  );
}

export default App;
