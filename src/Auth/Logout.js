import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ReusableComponents/Button';

const Logout = ({ setIsAuthenticated, handleMessageClear, setError }) => {
  const navigate = useNavigate();

  const handleLogout = () => {

    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); 
    setError("You have logged out.");
    handleMessageClear();
    navigate("/");
  };
  

 
    return (
      <Button onClick={handleLogout}>Logout </Button>
   );

 
};

export default Logout;
