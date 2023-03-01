import React from 'react';
import SuggestionItem from './SuggestionItem';
import { Link } from 'react-router-dom';

const SuggestionsResults = ({ suggestions, error }) => {
  return (
    <>
      {error && (
        <div className="h-72 flex items-center justify-center">{error}</div>
      )}
      {suggestions && suggestions.length > 0 ? (
        <div className="w-[90vw] mx-auto md:w-full md:mx-0 flex flex-col gap-y-4">
          {suggestions.map((suggestion) => (
            <SuggestionItem key={suggestion.id} {...suggestion} clickable />
          ))}
        </div>
      ) : (
        <div className="h-full text-center flex justify-center items-center bg-white rounded-md">
          <div className="max-w-[60%] text-center flex flex-col gap-y-4">
            <h2 className="text-2xl text-grayPrimary font-bold">
              There is no feedback yet.
            </h2>
            <p className="text-lg text-gray-500 font-medium">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
            <Link to="/add-feedback" className="btn-primary block self-center">
              + Add Feedback
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SuggestionsResults;
