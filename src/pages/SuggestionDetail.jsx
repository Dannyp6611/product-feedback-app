import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDocument } from '../hooks/useDocument';

import SuggestionItem from '../components/SuggestionItem';
import CommentForm from '../components/CommentForm';
import SuggestionComments from '../components/SuggestionComments';

const SuggestionDetail = () => {
  const { id } = useParams();

  const { document: suggestion, error } = useDocument('suggestions', id);

  console.log(suggestion);

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
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <Link to="/">Go Back</Link>

        <button className="btn-secondary">Edit Feedback</button>
      </div>
      <SuggestionItem {...suggestion} />
      {suggestion.comments && suggestion.comments.length > 0 && (
        <SuggestionComments comments={suggestion.comments} />
      )}

      <CommentForm suggestion={suggestion} />
    </div>
  );
};

export default SuggestionDetail;
