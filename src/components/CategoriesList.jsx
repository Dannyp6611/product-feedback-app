import React from 'react';

import { CATEGORIES } from '../constants/categories';

import { uppercaseCategory } from '../helpers';

const CategoriesList = ({ categoryFilter, changeCategoryFilter, classes }) => {
  const handleClick = (newFilter) => {
    changeCategoryFilter(newFilter);
  };

  return (
    <div className={`nav-card bg-white ${classes}`}>
      <ul className="flex flex-wrap gap-4">
        {CATEGORIES.map((category) => (
          <li
            className={`px-4 py-1  font-medium rounded-md cursor-pointer text-sm ${
              categoryFilter === category
                ? 'bg-colorBluePrimary text-white'
                : 'bg-whiteSecondary text-colorBluePrimary'
            }`}
            key={category}
            onClick={() => handleClick(category)}
          >
            {uppercaseCategory(category)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
