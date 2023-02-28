import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDocument } from '../hooks/useDocument';

import SuggestionItem from '../components/SuggestionItem';

const SuggestionDetail = () => {
  const { id } = useParams();

  const { document: suggestion, error } = useDocument('suggestions', id);

  if (error) {
    return (
      <div className="h-72 flex items-center justify-center container">
        {error}
      </div>
    );
  }

  if (!document) {
    return (
      <div className="h-72 flex items-center justify-center container">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <Link to="/">Go Back</Link>

        <button className="btn-secondary">Edit Feedback</button>
      </div>
      <SuggestionItem {...suggestion} />
    </div>
  );
};

export default SuggestionDetail;
