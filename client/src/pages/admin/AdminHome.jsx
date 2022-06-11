import React from 'react';
import Chart from '../../components/admin/Chart';
import FeaturedInfo from '../../components/admin/FeaturedInfo';
import './AdminHome.scss';
import { usersData } from '../../util/DummyData';

const Home = () => {
  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart
        title='Users Analytics'
        data={usersData}
        dataKey='Active Users'
        grid
      />
    </div>
  );
};

export default Home;
