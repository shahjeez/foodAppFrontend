import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.scss"; // Add styles

const Navbar = ({ username, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false); // Update authentication state
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className='navbar'>
      <div className='username'>{username}</div>
      <button onClick={handleLogout} className='logout-btn'>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
