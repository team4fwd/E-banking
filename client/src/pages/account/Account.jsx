import Operation from '../../components/user/actions/Opertaion';
import Chart from '../../components/user/chart/Chart';
import TableList from '../../components/user/table/Table';
import Widget from '../../components/user/widget/Widget';
import './account.scss';

const Account = () => {
  return (
    <div className='account'>
      <div className='operations'>
        <Operation type='recharge' />
        <Operation type='withdraw' />
        <Operation type='transfer' />
      </div>
      <div className='widgets'>
        <Widget type='balance' />
        <Widget type='income' />
        <Widget type='outcome' />
      </div>
      <div className='account-chart'>
        <Chart aspect={5 / 1} title='Account transactions' />
      </div>
      <div className='bottom'>
        <h1 className='title'>Last Transactions</h1>
        <TableList />
      </div>
    </div>
  );
};
export default Account;
