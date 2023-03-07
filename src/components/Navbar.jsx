import React from 'react';

import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = ({
  textCenter,
  showMobileNav,
  handleShowMobileNav,
  classes,
}) => {
  return (
    <nav
      className={`bg-header-pattern-mobile md:bg-header-pattern-tablet lg:bg-header-pattern-desktop bg-cover text-white flex md:items-end ${
        textCenter ? 'justify-center' : 'justify-between'
      } nav-card`}
    >
      <header className={textCenter && 'text-center'}>
        <h1 className="md:text-xl font-bold">Feedback Board</h1>
        <p className="text-lg">Product Feedback</p>
      </header>
      {/* Mobile Menu Button */}
      <button onClick={handleShowMobileNav} className={classes}>
        {!showMobileNav && <BiMenuAltRight size={30} />}
        {showMobileNav && <AiOutlineClose size={30} />}
      </button>
    </nav>
  );
};

export default Navbar;
