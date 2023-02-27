import React, { useState } from 'react';

// react router
import { Link } from 'react-router-dom';

// components
import AuthLayout from '../../components/layout/AuthLayout';

// hooks
import useRegister from '../../hooks/useRegister';

const SignUp = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileError, setSelectedFileError] = useState(null);

  const { registerUser, isLoading, error } = useRegister();

  const buttonIsValid = displayName && email && password && selectedFile;

  // handle selected file
  const handleFileChange = (e) => {
    setSelectedFile(null);
    setSelectedFileError(null);

    const selected = e.target.files[0];

    if (!selected) {
      setSelectedFileError('Please select a file');
    }

    if (!selected.type.includes('image')) {
      setSelectedFileError('Please select a correct image format');
      return;
    }
    if (selected.size > 100000) {
      setSelectedFileError('Image file size must be less than 100kb');
      return;
    }

    setSelectedFileError(null);
    setSelectedFile(selected);
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!displayName || !email || !password || selectedFileError) return;

    registerUser(displayName, email, password, selectedFile);
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
              required
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
              required
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
              required
            />
          </label>

          <div>
            <input type="file" onChange={handleFileChange} />
            {selectedFileError && (
              <small className="text-base text-red-700 block text-center my-4">
                {selectedFileError}
              </small>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary w-auto disabled:bg-opacity-40"
            disabled={isLoading || !buttonIsValid}
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
