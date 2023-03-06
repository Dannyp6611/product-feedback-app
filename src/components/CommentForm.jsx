import React, { useState } from 'react';

import useFirestore from '../hooks/useFirestore';
import { useUserContext } from '../context/useUserContext';
import { v4 as uuidv4 } from 'uuid';

const CommentForm = ({ suggestion }) => {
  const [newComment, setNewComment] = useState('');

  const { updateDocument, response } = useFirestore('suggestions');

  const { user } = useUserContext();

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment) return;

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
        <textarea
          value={newComment}
          onChange={handleChange}
          className="h-32 block w-full rounded-md bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-colorPurple placeholder:text-gray-400 text-gray-700"
          placeholder="Type your comment here..."
        />
        <div className="flex items-center justify-between my-4">
          <button className="btn-primary">Post Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
