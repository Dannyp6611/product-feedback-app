import React from 'react';

const RepliesList = ({
  reply,
  handleReplyToggle,
  toggling,
  newReply,
  setNewReply,
  handleSubmit,
  cancelReplyToggle,
  replyError,
}) => {
  return (
    <div className="py-4">
      <button
        onClick={() => handleReplyToggle(reply.id)}
        className="text-colorBluePrimary hover:underline underline-offset-1 font-medium absolute right-0 text-sm"
      >
        Reply
      </button>
      <div className="flex items-center gap-x-2">
        <div className="w-[40px] h-[40px] mr-[4px]">
          <img
            src={reply.user.image}
            width="40"
            height="40"
            className="object-cover rounded-full"
          />
        </div>
        <h4 className="text-sm text-grayPrimary font-bold">
          {reply.user.username}
        </h4>
      </div>
      <div className="ml-12">
        <p className="text-gray-600 text-sm md:text-base">
          {' '}
          <span className="font-bold text-colorPurple">
            @{reply.replyingTo}
          </span>{' '}
          {reply.content}
        </p>
      </div>

      {toggling.commentID === reply.id && toggling.isToggling && (
        <form
          onSubmit={(e) => handleSubmit(e, reply)}
          className="text-6xl md:pl-[50px] mt-10 mb-4 flex flex-col md:flex-row md:gap-4 gap-12 h-32 justify-items-start relative"
        >
          {/* buttons */}
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            className="text-area h-20 md:h-16"
            placeholder={`replying to @${reply.user.username}`}
          />
          {replyError && (
            <small className="w-full sm:w-[60%] error absolute bottom-12 left-0 right-0 sm:mx-auto md:ml-12 md:bottom-5">
              {replyError}
            </small>
          )}
          <div className="flex gap-x-2 md:gap-y-4 md:flex-col">
            <button className="btn-accent flex-1" onClick={cancelReplyToggle}>
              Cancel
            </button>
            <button className="btn-primary flex-1" type="submit">
              Post Reply
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RepliesList;
