import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MdKeyboardArrowDown } from 'react-icons/md';

import CheckIcon from '../assets/icon-check.svg';
import BulbIcon from '../assets/icon-suggestions.svg';

import { SORT_FILTERS } from '../constants/sortBy';

const SortBar = ({ classes, suggestions, changeSortFilter, sortedFilter }) => {
  const [sortFilter, setSortFilter] = useState({
    selectedFilter: sortedFilter,
    showDropdown: false,
  });

  const amountOfSuggestions = suggestions?.length;

  const showFilterDropdown = () => {
    setSortFilter((prevState) => {
      return {
        ...prevState,
        showDropdown: !prevState.showDropdown,
      };
    });
  };

  const handleFilterClick = (selectedFilter) => {
    setSortFilter({
      selectedFilter,
      showDropdown: false,
    });
    changeSortFilter(selectedFilter);
  };

  return (
    <div
      className={`bg-grayPrimary flex items-center  text-white py-2 md:mt-6 mb-3 md:mb-6 xl:mt-0 xl:py-4 px-6 ${classes}`}
    >
      <div className="hidden md:flex items-start gap-x-3 mr-6">
        <img
          src={BulbIcon}
          width="20"
          height="20"
          className="block object-cover"
        />
        <h2 className=" text-xl font-bold">
          {amountOfSuggestions} Suggestions
        </h2>
      </div>

      <div className="relative">
        <div
          className="flex items-center gap-x-2 cursor-pointer text-sm md:text-base"
          onClick={showFilterDropdown}
        >
          <span className="text-white">Sort By : </span>
          <span className="flex items-center gap-x-1 font-bold">
            {sortFilter.selectedFilter}
            <MdKeyboardArrowDown
              className={`${sortFilter.showDropdown && 'transform rotate-180'}`}
            />
          </span>
        </div>
        {sortFilter.showDropdown && (
          <ul className="absolute left-14 w-64 top-7 bg-white rounded-md shadow-xl  z-10">
            {SORT_FILTERS.map((filter, idx) => {
              return (
                <li
                  key={`${filter}-${idx}`}
                  onClick={() => handleFilterClick(filter)}
                  className={`p-4 flex items-center justify-between cursor-pointer border-b border-gray-200 ${
                    sortFilter.selectedFilter === filter
                      ? 'text-colorPurple'
                      : 'text-gray-500'
                  } `}
                >
                  {filter}
                  {sortFilter.selectedFilter === filter && (
                    <img src={CheckIcon} />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Link to="/add-feedback" className="btn-primary ml-auto">
        + Add Feedback
      </Link>
    </div>
  );
};

export default SortBar;
