import React, { useState } from 'react';

// helpers
import { calculateTotalComments } from '../helpers';

// components
import { Navbar, CategoriesList, Logout, SortBar } from '../components';
import MobileNav from '../components/MobileNav';
import SuggestionsResults from '../components/SuggestionsResults';

// hooks
import useCollection from '../hooks/useCollection';

const Home = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState(
    localStorage.getItem('sortBy')
      ? localStorage.getItem('sortBy')
      : 'most upvotes'
  );
  const [showMobileNav, setShowMobileNav] = useState(false);

  if (showMobileNav) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'auto';
  }

  const { documents, error } = useCollection('suggestions', null, [
    'createdAt',
    'desc',
  ]);

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
        return document.category.label === categoryFilter;
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
        (a, b) =>
          calculateTotalComments(b.comments) -
          calculateTotalComments(a.comments)
      );
    } else if (sortFilter === 'least comments') {
      suggestions = suggestions.sort(
        (a, b) =>
          calculateTotalComments(a.comments) -
          calculateTotalComments(b.comments)
      );
    }
  }

  // handle showNavbar
  const handleShowMobileNav = () => {
    setShowMobileNav((prevState) => !prevState);
  };

  return (
    <div className="md:container md:p-12 xl:flex gap-x-4">
      <MobileNav
        showMobileNav={showMobileNav}
        categoryFilter={categoryFilter}
        changeCategoryFilter={changeCategoryFilter}
      />
      <div className="md:w-full md:flex md:flex-row xl:flex-col gap-x-4 gap-y-6 md:h-[160px] xl:h-[50vh] xl:min-h-[500px] xl:w-[260px]">
        <Navbar
          showMobileNav={showMobileNav}
          handleShowMobileNav={handleShowMobileNav}
          classes="md:hidden"
        />
        <CategoriesList
          categoryFilter={categoryFilter}
          changeCategoryFilter={changeCategoryFilter}
          classes="hidden md:block"
        />
        <Logout />
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
