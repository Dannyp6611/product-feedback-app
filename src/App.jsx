import { Routes, Route, Navigate } from 'react-router-dom';

// import pages
import { Login, SignUp, Home, AddFeedback } from './pages';

import { useUserContext } from './context/useUserContext';
import SuggestionDetail from './pages/SuggestionDetail';
import EditFeedback from './pages/EditFeedback';

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
      <Route
        path="/add-feedback"
        element={<>{user ? <AddFeedback /> : <Navigate to="/login" />}</>}
      />
      <Route
        path="/suggestion/:id"
        element={user ? <SuggestionDetail /> : <Navigate to="/login" />}
      />
      <Route
        path="/edit-feedback/:suggestionID"
        element={user ? <EditFeedback /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
