import React from 'react';
import { Link } from 'react-router-dom';

const SortBar = ({ classes }) => {
  return (
    <div className={`bg-orange-500  flex items-center p-4 ${classes}`}>
      <p className="text-white">Sort By:</p>

      <Link to="/add-feedback" className="btn-primary ml-auto">
        + Add Feedback
      </Link>
    </div>
  );
};

export default SortBar;
