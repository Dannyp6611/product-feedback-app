import React, { useState } from 'react';
import { useUserContext } from '../context/useUserContext';

import useFirestore from '../hooks/useFirestore';
import SingleComment from './SingleComment';

import { calculateTotalComments } from '../helpers';

import { v4 as uuidv4 } from 'uuid';

const SuggestionComments = ({ suggestion, comments }) => {
  const { user } = useUserContext();
  const [toggling, setToggling] = useState({
    commentID: null,
    isToggling: false,
  });
  const [replyError, setReplyError] = useState(null);

  const { updateDocument, response } = useFirestore('suggestions');

  const [newReply, setNewReply] = useState('');

  const handleSubmit = async (e, commentData) => {
    e.preventDefault();
    setReplyError(null);

    if (!newReply.trim('')) {
      setReplyError("Reply can't be empty");
      return;
    }

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

    const cancelReplyToggle = () => {
      setNewReply('');
      setToggling({
        commentID: null,
        isToggling: false,
      });
    };

    // add comments
    await updateDocument(suggestion.id, {
      comments: suggestion.comments.map((comment) => {
        if (
          comment.id === commentData.id ||
          comment.replies?.find((reply) => reply.id === commentData.id)
        ) {
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
      cancelReplyToggle();
    }
  };

  return (
    <div className="bg-white rounded-md p-6">
      {/* comments title */}
      <h2 className="text-2xl font-bold text-grayPrimary mb-4">
        {calculateTotalComments(comments)} Comments
      </h2>
      {/* comments */}
      <div className="flex flex-col gap-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="py-3">
            <SingleComment
              content={comment}
              handleSubmit={handleSubmit}
              comment={comment}
              newReply={newReply}
              setNewReply={setNewReply}
              suggestionComments={suggestion?.comments}
              toggling={toggling}
              setToggling={setToggling}
              replyError={replyError}
              setReplyError={setReplyError}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionComments;
