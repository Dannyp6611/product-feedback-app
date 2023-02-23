import React from 'react';

import { BiMenuAltRight } from 'react-icons/bi';

const Navbar = () => {
  return (
    <nav className="bg-colorPurple flex items-center justify-between text-white  md:items-end nav-card">
      <header>
        <h1 className="md:text-xl font-bold">Feedback Board</h1>
        <p className="text-lg">Product Feedback</p>
      </header>
      {/* Mobile Menu Button */}
      <button className="md:hidden">
        <BiMenuAltRight size={30} />
      </button>
    </nav>
  );
};

export default Navbar;
