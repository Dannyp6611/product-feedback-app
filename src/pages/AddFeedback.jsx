import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import { timestamp } from '../firebase/config';

// components
import BackButton from '../components/BackButton';

// constants
import { CATEGORIES } from '../constants/categories';

import { useUserContext } from '../context/useUserContext';

// hooks
import useFirestore from '../hooks/useFirestore';

import AddFeedbackIcon from '../assets/icon-new-feedback.svg';

const AddFeedback = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const { addDocument, response } = useFirestore('suggestions');

  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [category, setCategory] = useState({
    value: CATEGORIES[0],
    label: CATEGORIES[0],
  });
  const [feedbackDetail, setFeedbackDetail] = useState('');
  const [formError, setFormError] = useState(null);

  const categoryOptions = CATEGORIES.map((category) => {
    return {
      value: category,
      label: category === 'ui' ? 'UI' : category === 'ux' ? 'UX' : category,
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);

    if (!feedbackTitle.trim('')) {
      setFormError({
        field: 'feedbackTitle',
        message: 'Please enter a title for your feedback',
      });
      return;
    }

    if (!feedbackDetail.trim('')) {
      setFormError({
        field: 'feedbackDetail',
        message: 'Please enter some details for your feedback',
      });
      return;
    }

    const feedbackData = {
      title: feedbackTitle,
      category,
      detail: feedbackDetail,
      comments: [],
      upvotes: { count: 0, userIds: [] },
      userId: user.uid,
    };

    await addDocument(feedbackData);
    if (!response.error) {
      navigate('/');
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-[80vw] max-w-lg mx-auto mt-8 pb-4">
        <BackButton />
        <form
          className="bg-white relative rounded-lg p-6 w-full mt-8"
          onSubmit={handleSubmit}
        >
          <img src={AddFeedbackIcon} className="absolute -top-5 left-5" />
          <h1 className="text-2xl mb-4 text-grayPrimary font-bold mt-8">
            Create New Feedback
          </h1>
          <div className="mb-6">
            <label htmlFor="title" className="mb-4 block">
              <h2 className="text-base text-grayPrimary font-bold">
                Feedback Title
              </h2>
              <small className="text-gray-600">
                Add a short, descriptive title
              </small>
            </label>
            <input
              value={feedbackTitle}
              onInput={(e) => setFeedbackTitle(e.target.value)}
              id="title"
              type="text"
              className="block w-full rounded-md bg-gray-200 p-2 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-colorPurple mb-2"
            />
            {formError?.field === 'feedbackTitle' && (
              <small className="error">{formError.message}</small>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="title" className="mb-4 block">
              <h2 className="text-base text-grayPrimary font-bold">Category</h2>
              <small className="text-gray-600">
                Choose a category for your feedback
              </small>
            </label>
            <Select
              options={categoryOptions}
              onChange={(option) => setCategory(option)}
              value={category}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="title" className="mb-4 block">
              <h2 className="text-base text-grayPrimary font-bold">
                Feedback Detail
              </h2>
              <small className="text-gray-600">
                Include any specific comments on what should be improved, added,
                etc.
              </small>
            </label>
            <textarea
              value={feedbackDetail}
              onInput={(e) => setFeedbackDetail(e.target.value)}
              className="text-area h-32 overflow-hidden mb-2"
            />
            {formError?.field === 'feedbackDetail' && (
              <small className="error">{formError.message}</small>
            )}
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-4">
            <button
              className="btn-secondary md:ml-auto"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button className="btn-primary" type="submit">
              Add Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFeedback;
