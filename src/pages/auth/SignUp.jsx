import React, { useState } from 'react';

// react router
import { Link } from 'react-router-dom';

// components
import AuthLayout from '../../components/AuthLayout';

// hooks
import useRegister from '../../hooks/useRegister';

const SignUp = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { registerUser, isLoading, error } = useRegister();

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(displayName, email, password);
  };

  return (
    <AuthLayout>
      <>
        <h1 className="mb-6 text-xl font-bold">Register</h1>
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <label htmlFor="displayName" className="block w-full">
            <input
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
              id="displayName"
              type="displayName"
              placeholder="Display Name"
              className="block w-full px-4 py-2 placeholder:text-grayPrimary border-b-2 focus:border-b-2 focus:border-colorPurple focus:outline-none"
            />
          </label>
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

          <button
            type="submit"
            className="btn-primary w-auto disabled:bg-opacity-70"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center p-4 text-base w-full block font-semibold">
          Already registered? <br />
          <Link to="/login" className="text-colorPurple font-bold">
            Login here
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

export default SignUp;
