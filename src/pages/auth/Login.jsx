import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';

import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser, error, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(email, password);
  };

  return (
    <AuthLayout>
      <>
        <h1 className="mb-6 text-xl font-bold">Login</h1>
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block w-full">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="email"
              placeholder="Email address"
              className="block w-full px-4 py-2 placeholder:text-grayPrimary border-b-2 focus:border-b-2 focus:border-colorPurple focus:outline-none"
            />
          </label>

          <label htmlFor="password" className="block w-full">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type="password"
              placeholder="Password"
              className="block w-full px-4 py-2 placeholder:text-grayPrimary border-b-2 focus:border-b-2 focus:border-colorPurple focus:outline-none"
            />
          </label>

          <button type="submit" className="btn-primary w-auto">
            Login
          </button>
        </form>
        <p className="text-center p-4 text-base w-full block font-semibold">
          Not yet registered? <br />
          <Link to="/register" className="text-colorPurple font-bold">
            Sign up here
          </Link>
        </p>
        {error && (
          <small className="text-red-700 text-center block w-full text-sm font-semibold">
            {error}
          </small>
        )}
      </>
    </AuthLayout>
  );
};

export default Login;
