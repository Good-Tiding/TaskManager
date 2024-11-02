
import React from 'react';
import EditTaskForm from './EditTaskForm';
import '../CSS/TaskEditModal.css'

const TaskEditModal = ({ showModal, editingTask, onUpdateTask, onCancel }) => {
  if (!showModal) return null;

  return (
    <div className="modal show" style={{ display: 'block' }} onClick={onCancel}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content custom-modal">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <EditTaskForm
              task={editingTask}
              onUpdateTask={onUpdateTask}
              onCancel={onCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskEditModal);
