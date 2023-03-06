import React from 'react';

const RepliesList = ({
  reply,
  handleReplyToggle,
  toggling,
  newReply,
  setNewReply,
  handleSubmit,
  cancelReplyToggle,
}) => {
  return (
    <div className="py-4">
      <button
        onClick={() => handleReplyToggle(reply.id)}
        className="text-colorBluePrimary hover:underline underline-offset-1 font-bold absolute right-0 text-sm"
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
      <div>
        <p className="text-gray-600">
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
          className="text-6xl md:pl-[50px] mt-10 mb-4 flex flex-col md:flex-row gap-4 h-32 justify-items-start"
        >
          {/* buttons */}
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            className="block rounded-md bg-gray-200 p-2 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-colorPurple h-14 overflow-hidden flex-1 text-sm"
            placeholder={`replying to @${reply.user.username}`}
          />
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
