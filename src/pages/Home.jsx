import React, { useState } from 'react';

import { Navbar, CategoriesList, RoadmapList, SortBar } from '../components';
import SuggestionsResults from '../components/SuggestionsResults';
import useCollection from '../hooks/useCollection';

const Home = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState(
    localStorage.getItem('sortBy')
      ? localStorage.getItem('sortBy')
      : 'most upvotes'
  );

  const { documents, error } = useCollection('suggestions');

  const changeCategoryFilter = (newFilter) => {
    setCategoryFilter(newFilter);
  };

  const changeSortFilter = (newFilter) => {
    setSortFilter(newFilter);
    localStorage.setItem('sortBy', newFilter);
  };

  // sort by category filter
  let suggestions = documents?.filter((document) => {
    switch (categoryFilter) {
      case 'all':
        return true;
      case 'ui':
      case 'ux':
      case 'enhancement':
      case 'feature':
      case 'bug':
        return document.category === categoryFilter;
      default:
        return true;
    }
  });

  // sort by upvotes & comments
  if (suggestions && suggestions.length > 0) {
    if (sortFilter === 'most upvotes') {
      suggestions = suggestions.sort(
        (a, b) => b.upvotes.count - a.upvotes.count
      );
    } else if (sortFilter === 'least upvotes') {
      suggestions = suggestions.sort(
        (a, b) => a.upvotes.count - b.upvotes.count
      );
    } else if (sortFilter === 'most comments') {
      suggestions = suggestions.sort(
        (a, b) => b.comments.length - a.comments.length
      );
    } else if (sortFilter === 'least comments') {
      suggestions = suggestions.sort(
        (a, b) => a.comments.length - b.comments.length
      );
    }
  }

  return (
    <div className="md:container md:p-12 xl:flex gap-x-4">
      <div className="md:w-full md:flex md:flex-row xl:flex-col gap-x-4 gap-y-6 md:h-[160px] xl:h-[70vh] xl:min-h-[500px] xl:w-[260px]">
        <Navbar />
        <CategoriesList
          categoryFilter={categoryFilter}
          changeCategoryFilter={changeCategoryFilter}
        />
        <RoadmapList />
        <SortBar
          classes="md:hidden"
          sortedFilter={sortFilter}
          changeSortFilter={changeSortFilter}
          suggestions={suggestions}
        />
      </div>
      <div className="xl:flex-1">
        <SortBar
          classes="hidden md:flex rounded-md mb-2"
          sortedFilter={sortFilter}
          changeSortFilter={changeSortFilter}
          suggestions={suggestions}
        />
        <SuggestionsResults suggestions={suggestions} error={error} />
      </div>
    </div>
  );
};

export default Home;
