import React, { useState } from 'react';
import { useUserContext } from '../context/useUserContext';

import useFirestore from '../hooks/useFirestore';

const SuggestionComments = ({ suggestion, comments }) => {
  const { user } = useUserContext();

  const { updateDocument, response } = useFirestore('suggestions');

  const [newReply, setNewReply] = useState('');
  const [toggling, setToggling] = useState({
    commentID: null,
    isToggling: false,
  });

  const handleReplyToggle = (id) => {
    setToggling({ commentID: id, isToggling: true });
  };

  const handleSubmit = async (e, commentData) => {
    e.preventDefault();

    // create new reply
    const replyToAdd = {
      content: newReply,
      replyingTo: commentData.user.username,
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
            replies: [...comment.replies, replyToAdd],
          };
        }
        return comment;
      }),
    });

    if (!response.error) {
      console.log('reply added');
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
          <div className="border-b border-gray-200 py-3">
            <div key={comment.id} className="md:flex gap-4 relative">
              <button
                onClick={() => handleReplyToggle(comment.id)}
                className="text-colorBluePrimary hover:underline underline-offset-1 font-bold absolute right-0 text-sm"
              >
                Reply
              </button>
              <div className="flex items-center">
                <div className="w-[40px] h-[40px] mr-[4px]">
                  <img
                    src={comment.user.image}
                    width="40"
                    height="40"
                    className="object-cover rounded-full"
                  />
                </div>
                <h4 className="text-sm text-grayPrimary font-bold md:hidden">
                  {comment.user.username}
                </h4>
              </div>
              <div className="">
                <h4 className="text-base text-grayPrimary font-bold hidden md:block">
                  {comment.user.username}
                </h4>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            </div>

            {toggling.commentID === comment.id && toggling.isToggling && (
              <form
                onSubmit={(e) => handleSubmit(e, comment)}
                className="text-6xl md:pl-[50px] mt-10 mb-4 flex flex-col md:flex-row gap-4 h-32 justify-items-start"
              >
                {/* buttons */}
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="block rounded-md bg-gray-200 p-2 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-colorPurple h-14 overflow-hidden flex-1 text-sm"
                  placeholder={`replying to @${comment.user.username}`}
                />
                <div className="flex justify-between md:flex-col">
                  {/* <button className="btn-primary">Post Reply</button> */}
                  <button className="btn-primary" type="submit">
                    Post Reply
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionComments;
