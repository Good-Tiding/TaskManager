import React, { useState, useCallback  } from 'react';

import TaskForm from './TaskForm'; 

const EditTaskForm = ({ task, onUpdateTask, onCancel }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = useCallback((field, value) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onUpdateTask(editedTask);
  }, [editedTask, onUpdateTask]);

  return (
    <TaskForm
      task={editedTask}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
};

export default EditTaskForm;


