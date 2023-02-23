import React from 'react';

import { Navbar, CategoriesList, RoadmapList } from '../components';

const Home = () => {
  return (
    <div className="md:container md:p-12 xl:flex gap-x-4">
      <div className="md:w-full md:flex md:flex-row xl:flex-col gap-x-4 gap-y-6 md:h-[160px] xl:h-[70vh] xl:min-h-[500px] xl:w-[260px]">
        <Navbar />
        <CategoriesList />
        <RoadmapList />
      </div>
      <div className="xl:flex-1">
        <h1>Results</h1>
      </div>
    </div>
  );
};

export default Home;
