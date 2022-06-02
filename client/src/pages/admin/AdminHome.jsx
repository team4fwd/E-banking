import React from 'react';
import Chart from '../../components/admin/Chart';
import FeaturedInfo from '../../components/admin/FeaturedInfo';
import './AdminHome.scss';
import { usersData } from '../../util/DummyData';
// import WidgetSm from '../../components/admin/WidgetSm';
// import WidgetLg from '../../components/admin/WidgetLg';

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
      {/* <div className='home__widgets'>
        <WidgetSm />
        <WidgetLg />
      </div> */}
    </div>
  );
};

export default Home;
