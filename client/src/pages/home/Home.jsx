import './home.scss';
import Widget from '../../components/user/widget/Widget';
import Featured from '../../components/user/featured/Featured';
import Chart from '../../components/user/chart/Chart';
import TableList from '../../components/user/table/Table';

const Home = () => {
  return (
    <div className='home'>
      <div className='widgets'>
        <Widget type='accounts' />
        <Widget type='balance' />
        <Widget type='income' />
        <Widget type='outcome' />
      </div>
      <div className='charts'>
        <Featured />
        <Chart aspect={2 / 1} title='Last 6 Months' />
      </div>
      <div className='list-container'>
        <div className='list-container__title'>Latest Transactions</div>
        <TableList />
      </div>
    </div>
  );
};
export default Home;
