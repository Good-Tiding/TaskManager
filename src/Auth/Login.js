import React from 'react';
import AuthForm from './AuthForm';
import '../CSS/Auth.css'; 

const Login = ({ setIsAuthenticated, setMessage, handleMessageClear, setError, setUsername }) => {
  return (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <AuthForm
        isLogin={true}
        setIsAuthenticated={setIsAuthenticated}
        setMessage={setMessage}
        handleMessageClear={handleMessageClear}
        setError={setError}
        setUsername={setUsername}
      />
    </div>
  );
};

export default React.memo(Login);
