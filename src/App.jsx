import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Ingredients from "./components/Ingredients";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    // Update authentication state when token changes
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default Route (Redirect based on authentication) */}
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <Navigate to='/ingredients' />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/ingredients'
          element={
            isAuthenticated ? (
              <Ingredients setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/login'
          element={
            isAuthenticated ? (
              <Navigate to='/ingredients' />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
