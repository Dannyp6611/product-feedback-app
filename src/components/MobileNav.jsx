import React from 'react';
import { createPortal } from 'react-dom';

import { CategoriesList, Logout } from '../components';

const MobileNav = ({
  showMobileNav,
  categoryFilter,
  changeCategoryFilter,
  isMobile,
}) => {
  return createPortal(
    <>
      {showMobileNav && isMobile && (
        <div className="h-screen w-screen bg-black/80 fixed left-0 right-0 bottom-0 top-[83px] md:hidden" />
      )}
      <div
        className={`fixed flex flex-col gap-y-6 w-[50vw] max-w-[250px] md:hidden h-screen right-0 top-[83px] bg-whiteSecondary p-2 sm:p-8 transform transition-all duration-75 ease-linear ${
          showMobileNav ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <CategoriesList
          categoryFilter={categoryFilter}
          changeCategoryFilter={changeCategoryFilter}
        />
        <Logout showMobile />
      </div>
    </>,
    document.body
  );
};

export default MobileNav;
