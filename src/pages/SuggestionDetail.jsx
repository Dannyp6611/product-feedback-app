import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDocument } from '../hooks/useDocument';

import SuggestionItem from '../components/SuggestionItem';
import CommentForm from '../components/CommentForm';
import SuggestionComments from '../components/SuggestionComments';
import BackButton from '../components/BackButton';

import { useUserContext } from '../context/useUserContext';

import Loader from '../components/Loader/Loader';

const SuggestionDetail = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const { user } = useUserContext();

  const userCreatedSuggestion = userId === user.uid;

  const { document: suggestion, error } = useDocument('suggestions', id);

  useEffect(() => {
    if (suggestion) {
      setUserId(suggestion.userId);
    }
  }, [suggestion]);

  if (error) {
    return (
      <div className="h-72 flex items-center justify-center container">
        {error}
      </div>
    );
  }

  if (!suggestion) {
    return (
      <div className="h-72 flex items-center justify-center container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-[90vw] max-w-[768px] mx-auto p-4 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <BackButton />

        {userCreatedSuggestion && (
          <Link to={`/edit-feedback/${id}`} className="btn-secondary">
            Edit Feedback
          </Link>
        )}
      </div>
      <SuggestionItem {...suggestion} />
      {suggestion.comments && suggestion.comments.length > 0 && (
        <SuggestionComments
          suggestion={suggestion}
          comments={suggestion.comments}
        />
      )}

      <CommentForm suggestion={suggestion} />
    </div>
  );
};

export default SuggestionDetail;
