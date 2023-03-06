import React, { useState } from 'react';
import { useUserContext } from '../context/useUserContext';

import useFirestore from '../hooks/useFirestore';
import SingleComment from './SingleComment';

import { v4 as uuidv4 } from 'uuid';

const SuggestionComments = ({ suggestion, comments }) => {
  const { user } = useUserContext();

  const { updateDocument, response } = useFirestore('suggestions');

  const [newReply, setNewReply] = useState('');

  const handleSubmit = async (e, commentData) => {
    e.preventDefault();

    // create new reply
    const replyToAdd = {
      content: newReply,
      replyingTo: commentData.user.username,
      id: uuidv4(),
      user: {
        image: user.photoURL,
        username: user.displayName,
      },
    };

    await updateDocument(suggestion.id, {
      comments: suggestion.comments.map((comment) => {
        if (comment.id === commentData.id) {
          return {
            ...comment,
            replies: comment.replies
              ? [...comment.replies, replyToAdd]
              : [replyToAdd],
          };
        }
        return comment;
      }),
    });

    if (!response.error) {
      setNewReply('');
    }
  };

  return (
    <div className="bg-white rounded-md p-6">
      {/* comments title */}
      <h2 className="text-2xl font-bold text-grayPrimary mb-4">
        {comments.length} comments
      </h2>
      {/* comments */}
      <div className="flex flex-col gap-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 py-3">
            <SingleComment
              content={comment}
              handleSubmit={handleSubmit}
              comment={comment}
              newReply={newReply}
              setNewReply={setNewReply}
              suggestionComments={suggestion?.comments}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionComments;
