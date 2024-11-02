import React from 'react';
import Button from '../ReusableComponents/Button';

const TaskListItems = ({ tasks, onEditClick, onDeleteTask, onCompletionToggle }) => {
  return (
    <ul className="list-group2">
      {tasks.map((taskString, index) => {
        const [title, description, priority, dueDate, completed] = taskString.split('|');
        return (
          <li key={index} className={`list-group-item p-4 d-flex justify-content-between align-items-start ${completed === 'true' ? 'list-group-item-success' : ''}`}>
            <div className="d-flex align-items-start">
              <input type="checkbox" checked={completed === 'true'} onChange={() => onCompletionToggle(index)} className="me-2" />
              <div>
                <h5 className="mb-4">{title}</h5>
                <p className="mb-2"><strong>Description:</strong> {description}</p>
                <p className="mb-2"><strong>Priority:</strong> {priority}</p>
                <p className="mb-2"><strong>Due Date:</strong> {dueDate}</p>
                <Button className="btn-sm me-2" onClick={() => onDeleteTask(index)}>Delete</Button>
                <Button className="btn-sm pr-4" onClick={() => onEditClick(taskString, index)}>Edit</Button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskListItems;
