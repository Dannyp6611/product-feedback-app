import React from 'react';
import { createPortal } from 'react-dom';
import CategoriesList from './CategoriesList';

const MobileNav = ({ showMobileNav, categoryFilter, changeCategoryFilter }) => {
  return createPortal(
    <div
      className={`fixed w-[50vw] max-w-[250px] md:hidden h-screen right-0 top-[83px] bg-whiteSecondary p-8 transform transition-all duration-75 ease-linear ${
        showMobileNav ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <CategoriesList
        categoryFilter={categoryFilter}
        changeCategoryFilter={changeCategoryFilter}
      />
    </div>,
    document.body
  );
};

export default MobileNav;
