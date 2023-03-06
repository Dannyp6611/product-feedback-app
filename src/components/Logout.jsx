import React from 'react';

import useLogout from '../hooks/useLogout';

import { useUserContext } from '../context/useUserContext';

const Logout = ({ showMobile }) => {
  const { user } = useUserContext();

  const { logoutUser } = useLogout();

  return (
    <div
      className={`nav-card bg-white flex-col justify-between md:flex ${
        showMobile ? 'flex' : 'hidden'
      }`}
    >
      <div className="flex gap-x-2">
        <div className="w-[40px] h-[40px] rounded-full">
          <img
            src={user.photoURL}
            width="40"
            height="40"
            className="overflow-hidden rounded-full object-cover block"
          />
        </div>
        <div className="">
          <p className="font-bold text-lg">{user.displayName}</p>
          <p className="text-gray-600 text-base">{user.email}</p>
        </div>
      </div>
      <button
        className="hidden md:inline-block btn-secondary"
        onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;