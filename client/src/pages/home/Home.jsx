import './home.scss';
import Widget from '../../components/user/widget/Widget';
import Featured from '../../components/user/featured/Featured';
import Chart from '../../components/user/chart/Chart';
import TableList from '../../components/user/table/Table';
import { useSelector } from 'react-redux';

const Home = () => {
  const accounts = useSelector((state) => state.accounts.accounts.length);
  const userTrans = useSelector(({ transactions }) => transactions);
  const income = userTrans.reduce(
    (sum, curr) => (curr.kind === 'income' ? sum + curr.amount : sum),
    0
  );
  const outcome = userTrans.reduce(
    (sum, curr) => (curr.kind === 'outcome' ? sum + curr.amount : sum),
    0
  );
  return (
    <div className='home'>
      <div className='widgets'>
        <Widget type='accounts' amount={accounts || 0} />
        <Widget type='balance' amount={income - outcome || 0} />
        <Widget type='income' amount={income || 0} />
        <Widget type='outcome' amount={outcome || 0} />
      </div>
      <div className='charts'>
        {/* <Featured /> */}
        <Chart aspect={4 / 1} title='Last 6 Months' />
      </div>
      <div className='list-container'>
        <div className='list-container__title'>Latest Transactions</div>
        <TableList />
      </div>
    </div>
  );
};
export default Home;
