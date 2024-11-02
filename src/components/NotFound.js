import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ReusableComponents/Button';

const NotFound = () => {
  return (
    <div className="no-tasks">
      <div className="no-tasks-content">
        <h4 className="text-muted mb-3">404 - Page Not Found</h4>
        <p className="mb-4 text-secondary">The page you are looking for does not exist.</p>
        <Link to="/">
          <Button className="btn-lg">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
