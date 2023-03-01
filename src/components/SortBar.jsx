import React from 'react';
import { Link } from 'react-router-dom';

const SortBar = ({ classes }) => {
  return (
    <div
      className={`bg-grayPrimary flex items-center text-white py-2 md:mt-6 mb-3 md:mb-6 xl:mt-0 px-6 ${classes}`}
    >
      <p className="text-white">Sort By:</p>

      <Link to="/add-feedback" className="btn-primary ml-auto">
        + Add Feedback
      </Link>
    </div>
  );
};

export default SortBar;
