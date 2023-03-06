import React, { useState } from 'react';
import RepliesList from './RepliesList';

const SingleComment = ({
  content,
  reply = false,
  handleSubmit,
  comment,
  newReply,
  setNewReply,
  suggestionComments,
}) => {
  const [toggling, setToggling] = useState({
    commentID: null,
    isToggling: false,
  });

  let replies = [];

  suggestionComments.forEach((c) => {
    if (comment.replies && comment.id === c.id) {
      replies = comment.replies;
    }
  });

  const handleReplyToggle = (id) => {
    setToggling({ commentID: id, isToggling: true });
  };

  return (
    <>
      <div key={content.id} className={`md:flex gap-4 relative mb-6`}>
        <button
          onClick={() => handleReplyToggle(content.id)}
          className="text-colorBluePrimary hover:underline underline-offset-1 font-bold absolute right-0 text-sm"
        >
          Reply
        </button>
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] mr-[4px]">
            <img
              src={content.user.image}
              width="40"
              height="40"
              className="object-cover rounded-full"
            />
          </div>
          <h4 className="text-sm text-grayPrimary font-bold md:hidden">
            {content.user.username}
          </h4>
        </div>
        <div>
          <h4 className="text-base text-grayPrimary font-bold hidden md:block">
            {content.user.username}
          </h4>
          <p className="text-gray-600">{content.content}</p>
        </div>
      </div>

      {replies &&
        replies.length > 0 &&
        replies.map((reply) => (
          <div
            className="relative ml-8 pl-6 border-l flex flex-col"
            key={reply.id}
          >
            <RepliesList
              reply={reply}
              newReply={newReply}
              setNewReply={setNewReply}
              handleReplyToggle={handleReplyToggle}
              handleSubmit={handleSubmit}
              key={reply.id}
              toggling={toggling}
            />
          </div>
        ))}

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
    </>
  );
};

export default SingleComment;
