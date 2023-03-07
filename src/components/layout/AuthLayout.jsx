import React from 'react';
import Navbar from '../Navbar';

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen grid place-items-center bg-whiteSecondary">
      <div className="w-3/4 max-w-[460px]">
        <div className="w-[320px] mx-auto">
          <Navbar classes="hidden" textCenter />
        </div>
        <div className="bg-white text-grayPrimary p-8 rounded-md shadow-md mt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
