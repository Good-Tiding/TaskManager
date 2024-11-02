import React, { useState, useCallback, useEffect, useRef } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import Button from '../ReusableComponents/Button';
import Input from '../ReusableComponents/Input';
import Card from '../ReusableComponents/Card';

const AuthForm = ({ isLogin, setIsAuthenticated, setMessage, handleMessageClear, setError, setUsername }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  
  const navigate = useNavigate();
  const emailRef = useRef(null); // Ref for email input
  const passwordRef = useRef(null); // Ref for password input

  const handleChange = useCallback((key) => (value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value
    }));
  }, []);

  const handleLogin = useCallback(() => {
    const { email, password } = formData;
    const storedPassword = localStorage.getItem(email);
    const storedUsername = localStorage.getItem(`${email}_username`);

    if (!storedPassword) {
      setError("Email does not exist.");
      handleMessageClear();
      return;
    }

    if (bcrypt.compareSync(password, storedPassword)) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setUsername(storedUsername);
      setMessage("Login successful!");
      handleMessageClear();
      navigate("/taskslist");
    } else {
      setError("Invalid email or password.");
      handleMessageClear();
    }
  }, [formData, setIsAuthenticated, setError, setMessage, handleMessageClear, navigate]);

  const handleSignup = useCallback(() => {
    const { email, password, username } = formData;
    const existingUser = localStorage.getItem(email);
    if (!existingUser) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      localStorage.setItem(`${email}_username`, username);
      localStorage.setItem(email, hashedPassword);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setMessage("Account created successfully!");
      setUsername(username);
      handleMessageClear();
      navigate("/taskcreation");
    } else {
      setError("Email already exists.");
      handleMessageClear();
    }
  }, [formData, setIsAuthenticated, setError, setMessage, setUsername, handleMessageClear, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
    clearFields();
  };

  const clearFields = () => {
    setFormData({ username: "", email: "", password: "" });
    if (emailRef.current) emailRef.current.focus(); // Set focus back to email input
  };

  useEffect(() => {
    if (isLogin && emailRef.current) {
      emailRef.current.focus(); // Focus on email input when component mounts
    }
  }, [isLogin]);

  return (
    <Card
      title={<h2 className="p-4 text-center">{isLogin ? "Login" : "Sign Up"}</h2>}
      className="shadow mb-4 auth-card"
    >
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            value={formData.username}
            onChange={handleChange("username")}
            placeholder="Username"
            required
          />
        )}
        <Input
          ref={emailRef} // Attach ref to email input
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          placeholder="Email"
          required
        />
        <Input
          ref={passwordRef} // Attach ref to password input
          type="password"
          value={formData.password}
          onChange={handleChange("password")}
          placeholder="Password"
          required
        />
        <Button type="submit" className="w-100">{isLogin ? "Log In" : "Sign Up"}</Button>
      </form>
    </Card>
  );
};

export default React.memo(AuthForm);
