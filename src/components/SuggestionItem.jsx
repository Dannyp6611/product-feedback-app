import React from 'react';
import { Link } from 'react-router-dom';

const SuggestionItem = ({ category, detail, title, upvotes, comments, id }) => {
  return (
    <Link to={`/suggestion/${id}`} className="bg-white rounded-md p-4 block">
      <h2 className="text-lg text-grayPrimary font-bold">{title}</h2>
      <p className="text-base text-gray-500 mb-4">{detail}</p>

      {/* tag */}
      <span className="bg-whiteSecondary text-colorBluePrimary p-2 rounded-md font-semibold">
        {category}
      </span>

      <div className="flex justify-between items-center mt-6">
        <button className="bg-whiteSecondary p-2 rounded-md font-semibold flex items-center gap-x-2">
          <span className="text-colorBluePrimary">^</span>
          <p className="text-grayPrimary">5</p>
        </button>
        <span className=" text-grayPrimary font-bold">{comments?.length}</span>
      </div>
    </Link>
  );
};

export default SuggestionItem;
