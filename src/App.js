import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import React, { useState } from "react";
import './App.css';
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import Header from "./homepage/Header";
import Footer from "./homepage/Footer";
import Home from "./homepage/Home"; 
import NotFound from './components/NotFound'; 
import PrivateRoute from './components/PrivateRoute';
import TaskCreationForm from './Tasks/TaskCreationForm';
import TaskList from './Tasks/TaskList';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for authentication state on initial load
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  


  const [tasks, setTasks] = useState(() => {
    const userEmail = localStorage.getItem('username'); 
    const savedTasks = userEmail ? localStorage.getItem(`tasks_${userEmail}`) : null;
    return savedTasks ? savedTasks.split(';') : []; // Split only if savedTasks is not null
});

  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  

  const handleMessageClear = () => {
    setTimeout(() => {
        setMessage("");
        setError("");
    }, 3000);
  };
  
    const [username, setUsername] = useState(() => {
      return localStorage.getItem('username') || '';
    });



  return (
    <Router  basename="/TaskManager">
      <div className="d-flex flex-column min-vh-100">
        <Header 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated}  
          setError={setError} 
          handleMessageClear={handleMessageClear}
          username={username} 
          setTasks={setTasks}
        />
        {message && <div className="alert alert-info">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
            <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} setMessage={setMessage} setError={setError} handleMessageClear={handleMessageClear} setUsername={setUsername}  />} />
            <Route path="/login" element={<Login  setIsAuthenticated={setIsAuthenticated} setMessage={setMessage} setError={setError} handleMessageClear={handleMessageClear} setUsername={setUsername}  setTasks={setTasks} />} />
            <Route path="/taskslist" element={<PrivateRoute element={<TaskList tasks={tasks}  setTasks={setTasks}  />} isAuthenticated={isAuthenticated} />} />
            <Route path="/taskcreation" element={<PrivateRoute element={<TaskCreationForm   setTasks={setTasks} />} isAuthenticated={isAuthenticated} />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} /> 
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


