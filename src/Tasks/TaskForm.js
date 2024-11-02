// TaskForm.js
import React from 'react';
import Input from '../ReusableComponents/Input';
import Button from '../ReusableComponents/Button';

const TaskForm = ({ task, onChange, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="mt-3">
      <Input
        label="Task Title:"
        type="text"
        value={task.title}
        onChange={(value) => onChange('title', value)}
        name="taskTitle"
        required
      />
      <Input
        label="Task Description:"
        type="textarea"
        value={task.description}
        onChange={(value) => onChange('description', value)}
        name="taskDescription"
        required
      />
      <Input
        label="Priority:"
        type="select"
        value={task.priority}
        onChange={(value) => onChange('priority', value)}
        name="priority"
        options={[
          { value: 'Low', label: 'Low' },
          { value: 'Medium', label: 'Medium' },
          { value: 'High', label: 'High' },
        ]}
      />
      <Input
        label="Due Date:"
        type="date"
        value={task.dueDate}
        onChange={(value) => onChange('dueDate', value)}
        name="dueDate"
      />
      <div className="d-flex justify-content-between mt-3">
        <Button type="submit">Submit</Button>
        {onCancel && <Button type="button" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
};

export default TaskForm;
