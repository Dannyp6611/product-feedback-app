import React from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import { BsArrowLeftShort } from 'react-icons/bs';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-x-2 text-base"
    >
      <BsArrowLeftShort className="text-colorBluePrimary text-lg font-bold" />
      <span className="text-gray-500 font-bold  hover:underline hover:underline-offset-2 capitalize">
        go back
      </span>
    </button>
  );
};

export default BackButton;
