import React from 'react';

const SuggestionComments = ({ comments }) => {
  return (
    <div className="bg-white rounded-md p-4">
      {/* comments title */}
      <h2 className="text-2xl font-bold text-grayPrimary mb-4">
        {comments.length} comments
      </h2>
      {/* comments */}
      <div className="flex flex-col gap-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 py-3">
            <img
              src={comment.user.image}
              width="40"
              height="40"
              className="rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionComments;
