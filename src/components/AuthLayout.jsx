import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen grid place-items-center bg-whiteSecondary">
      <div className="w-3/4 max-w-[460px]">
        <div className="bg-white text-grayPrimary p-8 rounded-md shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
