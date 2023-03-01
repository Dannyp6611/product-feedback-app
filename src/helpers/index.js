export const uppercaseCategory = (category) => {
  return category === 'ui' || category === 'ux'
    ? category.toUpperCase()
    : category.slice(0, 1).toUpperCase() + category.slice(1);
};
