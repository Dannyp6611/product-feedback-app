import React from 'react';

import { useUserContext } from '../context/useUserContext';

import { BiMenuAltRight } from 'react-icons/bi';

const Navbar = () => {
  const { user } = useUserContext();

  return (
    <nav className="bg-colorPurple text-white flex md:items-end justify-between  nav-card">
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
