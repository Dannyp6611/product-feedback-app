import React from 'react';

import { CATEGORIES } from '../constants/categories';

const CategoriesList = () => {
  return (
    <div className="nav-card bg-white hidden md:block">
      <ul className="flex flex-wrap gap-4">
        {CATEGORIES.map((category) => (
          <li
            className="bg-whiteSecondary px-4 py-1 text-colorBluePrimary hover:bg-colorBluePrimary hover:text-white font-bold rounded-md cursor-pointer text-base"
            key={category}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
