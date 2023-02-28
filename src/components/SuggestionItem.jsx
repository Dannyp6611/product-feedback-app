import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuggestionItem = ({
  category,
  detail,
  title,
  upvotes,
  comments,
  id,
  clickable = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate(`/suggestion/${id}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white rounded-md p-4 block w-full"
    >
      <h2 className="text-lg text-grayPrimary font-bold">{title}</h2>
      <p className="text-base text-gray-500 mb-4">{detail}</p>

      {/* tag */}
      <span className="bg-whiteSecondary text-colorBluePrimary p-2 rounded-md font-semibold">
        {category}
      </span>

      <div className="flex justify-between items-center mt-6">
        <p className="bg-whiteSecondary p-2 rounded-md font-semibold flex items-center gap-x-2">
          <span className="text-colorBluePrimary">^</span>
          <span className="text-grayPrimary">5</span>
        </p>
        <p className=" text-grayPrimary font-bold">{comments?.length}</p>
      </div>
    </button>
  );
};

export default SuggestionItem;
