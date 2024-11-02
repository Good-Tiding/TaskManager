import React, { useState, useEffect, useCallback } from 'react';
import TaskEditModal from './TaskEditModal';
import { Link } from 'react-router-dom';
import '../CSS/TasksList.css';
import Button from '../ReusableComponents/Button';
import TaskListItems from './TaskListItems'; 

const TaskList = ({ tasks = [], setTasks }) => {
  const [modalState, setModalState] = useState({ editingTask: null, taskIndex: null, showModal: false });

  useEffect(() => {
    const userEmail = localStorage.getItem('username');
    const existingTasks = localStorage.getItem(`tasks_${userEmail}`);
    if (existingTasks) setTasks(existingTasks.split(';'));
  }, [setTasks]);

  const updateLocalStorage = (updatedTasks) => {
    const userEmail = localStorage.getItem('username');
    localStorage.setItem(`tasks_${userEmail}`, updatedTasks.join(';'));
    setTasks(updatedTasks);
  };

  const handleEditClick = useCallback((taskString, index) => {
    const taskDetails = taskString.split('|');
    setModalState({ editingTask: { title: taskDetails[0], description: taskDetails[1], priority: taskDetails[2], dueDate: taskDetails[3] }, taskIndex: index, showModal: true });
  }, []);

  const handleUpdateTask = useCallback((updatedTask, index) => {
    const existingTasks = tasks.map((task, i) => (i === index ? `${updatedTask.title}|${updatedTask.description}|${updatedTask.priority}|${updatedTask.dueDate}|${updatedTask.completed}` : task));
    updateLocalStorage(existingTasks);
  }, [tasks, updateLocalStorage]);

  const handleDeleteTask = useCallback((index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    updateLocalStorage(updatedTasks);
  }, [tasks, updateLocalStorage]);

  const handleCompletionToggle = useCallback((index) => {
    const [title, description, priority, dueDate, completed] = tasks[index].split('|');
    handleUpdateTask({ title, description, priority, dueDate, completed: completed === 'true' ? 'false' : 'true' }, index);
  }, [tasks, handleUpdateTask]);

  return (
    <div className="task-list-container">
      {tasks.length > 0 ? (
        <>
          <h1 className="text-center-tasks-list mb-4">Tasks List</h1>
          <TaskListItems
            tasks={tasks}
            onEditClick={handleEditClick}
            onDeleteTask={handleDeleteTask}
            onCompletionToggle={handleCompletionToggle}
          />
        </>
      ) : (
        <div className="no-tasks">
          <div className="no-tasks-content">
            <h4 className="text-muted mb-3">No Tasks Available</h4>
            <p className="mb-4 text-secondary">It looks like you don't have any tasks yet.</p>
            <Link to="/taskcreation">
              <Button className="btn-lg">Create Task</Button>
            </Link>
          </div>
        </div>
      )}
      <TaskEditModal
        showModal={modalState.showModal}
        editingTask={modalState.editingTask}
        onUpdateTask={(updatedTask) => handleUpdateTask(updatedTask, modalState.taskIndex)}
        onCancel={() => setModalState((prev) => ({ ...prev, showModal: false }))}
      />
    </div>
  );
};

export default React.memo(TaskList);
