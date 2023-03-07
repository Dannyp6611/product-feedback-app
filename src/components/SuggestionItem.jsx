import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BsChatFill } from 'react-icons/bs';
import { MdKeyboardArrowUp } from 'react-icons/md';

import useFirestore from '../hooks/useFirestore';

import { useUserContext } from '../context/useUserContext';

import { uppercaseCategory } from '../helpers';

import { calculateTotalComments } from '../helpers';

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
  const { user } = useUserContext();
  const [hasUserUpvoted, setHasUserUpvoted] = useState(
    upvotes.userIds.includes(user.uid)
  );

  const { updateDocument, response } = useFirestore('suggestions');

  const handleClick = (e) => {
    if (e.target.nodeName === 'DIV' && clickable) {
      navigate(`/suggestion/${id}`);
    }
  };

  const handleUpvote = async () => {
    if (!hasUserUpvoted) {
      // add upvote
      await updateDocument(id, {
        upvotes: {
          count: parseInt(upvotes.count + 1),
          userIds: [...upvotes.userIds, user.uid],
        },
      });
      if (!response.error) {
        setHasUserUpvoted(true);
      }
    } else {
      // remove upvote
      await updateDocument(id, {
        upvotes: {
          count:
            parseInt(upvotes.count) === 0 ? 0 : parseInt(upvotes.count - 1),
          userIds: upvotes.userIds.filter((id) => id !== user.uid),
        },
      });
      if (!response.error) {
        setHasUserUpvoted(false);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-md p-4 w-full flex flex-col md:flex-row-reverse items-start md:justify-end gap-y-4 gap-x-10 xl:gap-x-14 md:p-6 relative ${
        clickable && 'cursor-pointer'
      }`}
    >
      <div>
        <h2 className="text-base md:text-lg text-grayPrimary font-bold">
          {title}
        </h2>
        <p className="text-sm md:text-base text-gray-500 mb-4">{detail}</p>

        {/* tag */}
        <span className="bg-whiteSecondary text-colorBluePrimary py-1 px-3 rounded-md font-semibold text-sm">
          {uppercaseCategory(category.value)}
        </span>
      </div>

      <button
        onClick={handleUpvote}
        className={`${
          hasUserUpvoted
            ? 'bg-colorBluePrimary text-white'
            : 'bg-whiteSecondary text-grayPrimary'
        } py-1 px-2 md:px-4 rounded-md font-bold flex md:flex-col items-center gap-x-2 md:items-center`}
      >
        <MdKeyboardArrowUp
          className={`${
            hasUserUpvoted ? 'text-white' : 'text-colorBluePrimary'
          } font-bold text-lg`}
        />
        <span className="">{upvotes.count}</span>
      </button>
      <p className=" absolute bottom-6 md:bottom-16 right-6 text-sm md:text-base flex gap-x-2 items-center">
        <BsChatFill className="text-gray-300" />
        <span className="text-grayPrimary font-bold">
          {calculateTotalComments(comments)}
        </span>
      </p>
    </div>
  );
};

export default SuggestionItem;
