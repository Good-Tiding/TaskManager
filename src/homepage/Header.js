import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../Auth/Logout";
import Button from '../ReusableComponents/Button';
import '../CSS/Header.css';

const Header = ({ isAuthenticated, setIsAuthenticated, handleMessageClear, setError, setTasks }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
       
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => setDropdownOpen(true);


  return (
    <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center position-relative">
      <h1 
        className="header-heading h4 text-decoration-none cursor-pointer" 
        onMouseEnter={handleMouseEnter}
    
      >
        Task Manager
      </h1>

      {dropdownOpen && (
        <div ref={dropdownRef} className="drop-menu2">
          <Link to="/" className="dropdown-item">Home</Link>
          <Link to="/taskcreation" className="dropdown-item">Task Creation</Link>
          <Link to="/taskslist" className="dropdown-item">Tasks List</Link>
        </div>
      )}

      <div>
        {isAuthenticated ? (
          <Logout 
            setIsAuthenticated={setIsAuthenticated}
            handleMessageClear={handleMessageClear}
            setError={setError}
            setTasks={setTasks}
          />
        ) : (
          <>
            <Link to="/login">
              <Button variant="primary" className="me-2">Login</Button>
            </Link>
            <Link to="/signup">
              <Button >Register</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
