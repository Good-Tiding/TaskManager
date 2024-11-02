import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/TaskCreationForm.css'; 
import TaskForm from './TaskForm'; 
import Card from '../ReusableComponents/Card'; 

const TaskCreationForm = ({ setTasks }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });

  const navigate = useNavigate();

  const handleChange = useCallback((field, value) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleTaskCreate = useCallback((task) => {
    const userEmail = localStorage.getItem('username'); 
    const taskString = `${task.title}|${task.description}|${task.priority}|${task.dueDate}|incomplete`;
    const existingTasks = localStorage.getItem(`tasks_${userEmail}`) ? localStorage.getItem(`tasks_${userEmail}`).split(';') : [];
    const updatedTasks = [...existingTasks, taskString];
    localStorage.setItem(`tasks_${userEmail}`, updatedTasks.join(';')); 
    setTasks(updatedTasks);
  }, [setTasks]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    handleTaskCreate(newTask);

    setNewTask({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
    });

    navigate('/taskslist'); 
  }, [handleTaskCreate, newTask, navigate]);

  return (
    <div className="task-creation-container">
      <Card title={<h1 className="text-center">Create New Task</h1>} className="card task-creation-card">
        <TaskForm
          task={newTask}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};

export default React.memo(TaskCreationForm);
