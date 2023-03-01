import React, { useState } from 'react';

// ['all', 'ui', 'ux', 'enhancement', 'feature', 'bug'];

import { Navbar, CategoriesList, RoadmapList, SortBar } from '../components';
import SuggestionsResults from '../components/SuggestionsResults';
import useCollection from '../hooks/useCollection';

import useLogout from '../hooks/useLogout';

const Home = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { documents, error } = useCollection('suggestions');
  const { logoutUser } = useLogout();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const suggestions = documents?.filter((document) => {
    switch (currentFilter) {
      case 'all':
        return true;
      case 'ui':
      case 'ux':
      case 'enhancement':
      case 'feature':
      case 'bug':
        return document.category === currentFilter;
      default:
        return true;
    }
  });

  return (
    <div className="md:container md:p-12 xl:flex gap-x-4">
      <div className="md:w-full md:flex md:flex-row xl:flex-col gap-x-4 gap-y-6 md:h-[160px] xl:h-[70vh] xl:min-h-[500px] xl:w-[260px]">
        <Navbar />
        <CategoriesList
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
        <RoadmapList />
        <SortBar classes="md:hidden" />
        <button
          className="hidden md:inline-block btn-primary md:absolute md:btn-secondary"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
      <div className="xl:flex-1">
        <SortBar classes="hidden md:flex rounded-md mb-2" />
        <SuggestionsResults suggestions={suggestions} error={error} />
      </div>
    </div>
  );
};

export default Home;
