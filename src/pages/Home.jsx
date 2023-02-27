import React from 'react';

import { Navbar, CategoriesList, RoadmapList, SortBar } from '../components';
import SuggestionsResults from '../components/SuggestionsResults';

const Home = () => {
  return (
    <div className="md:container md:p-12 xl:flex gap-x-4">
      <div className="md:w-full md:flex md:flex-row xl:flex-col gap-x-4 gap-y-6 md:h-[160px] xl:h-[70vh] xl:min-h-[500px] xl:w-[260px]">
        <Navbar />
        <CategoriesList />
        <RoadmapList />
        {/* TODO: Once categories list + roadmap list goes from hidden to visible display the sort bar in the results section */}
        <SortBar />
      </div>
      <div className="xl:flex-1">
        <SuggestionsResults />
      </div>
    </div>
  );
};

export default Home;
