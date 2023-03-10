import React, { useEffect, useState } from 'react';

import useFirestore from '../hooks/useFirestore';
import { useUserContext } from '../context/useUserContext';
import { v4 as uuidv4 } from 'uuid';

const MAX_CHARACTERS = 250;

const CommentForm = ({ suggestion }) => {
  const { user } = useUserContext();
  const { updateDocument, response } = useFirestore('suggestions');

  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState(null);

  const [currentCharacters, setCurrentCharacters] = useState(MAX_CHARACTERS);

  const handleCharactersLeft = (e) => {
    const { key: keyPressed } = e;

    if (keyPressed === 'Backspace' && currentCharacters < MAX_CHARACTERS) {
      setCurrentCharacters((prevCharacters) => prevCharacters + 1);
    } else if (keyPressed !== 'Backspace') {
      setCurrentCharacters((prevCharacters) => prevCharacters - 1);
    }
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentError(null);

    if (!newComment.trim('')) {
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
            onKeyDown={handleCharactersLeft}
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
          <p
            className={`text-sm font-light capitalize ${
              currentCharacters < 0 ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {currentCharacters} characters left
          </p>
          <button
            disabled={currentCharacters < 0 || newComment === ''}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
