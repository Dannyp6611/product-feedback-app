import React, { useState } from 'react';

import useFirestore from '../hooks/useFirestore';
import { useUserContext } from '../context/useUserContext';
import { v4 as uuidv4 } from 'uuid';

const CommentForm = ({ suggestion }) => {
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState(null);

  const { updateDocument, response } = useFirestore('suggestions');

  const { user } = useUserContext();

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentError(null);

    if (!newComment) {
      setCommentError('Comment form cannot be empty');
      return;
    }

    const commentData = {
      id: uuidv4(),
      content: newComment,
      user: {
        image: user.photoURL,
        username: user.displayName,
      },
    };

    await updateDocument(suggestion.id, {
      comments: [...suggestion.comments, commentData],
    });

    if (!response.error) {
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-md p-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-grayPrimary font-bold mb-4">Add Comment</h2>
        <div>
          <textarea
            value={newComment}
            onChange={handleChange}
            className="text-area h-32"
            placeholder="Type your comment here..."
          />
          {commentError && (
            <small className="error block mt-6">
              comment form must not be empty
            </small>
          )}
        </div>

        <div className="flex items-center justify-between my-4">
          <p>250 characters left</p>
          <button className="btn-primary">Post Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
