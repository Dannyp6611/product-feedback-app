export const uppercaseCategory = (category) => {
  return category === 'ui' || category === 'ux'
    ? category.toUpperCase()
    : category.slice(0, 1).toUpperCase() + category.slice(1);
};

export const calculateTotalComments = (comments) => {
  let totalComments = 0;

  comments?.forEach((comment) => {
    totalComments += 1;
    if (comment.replies && comment.replies.length > 0) {
      totalComments += comment.replies.length;
    }
  });

  return totalComments;
};
