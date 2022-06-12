import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Operation from '../../components/user/actions/Opertaion';
import Chart from '../../components/user/chart/Chart';
import TableList from '../../components/user/table/Table';
import Widget from '../../components/user/widget/Widget';
import './account.scss';

const Account = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user.userInfo);
  const account = useSelector(
    (state) => state.accounts.accounts.filter((acc) => acc._id === id)[0]
  );

  useEffect(() => {
    if (!account?.isActive) {
      navigate(`/accounts`);
    }
  }, [account, navigate]);

  return (
    <div className='account'>
      <div className='operations'>
        <Operation
          type='recharge'
          id={id}
          token={token}
          currentAmount={account?.amount || 0}
        />
        <Operation
          type='withdrow'
          id={id}
          token={token}
          currentAmount={account?.amount || 0}
        />
        <Operation
          type='transfer'
          id={id}
          token={token}
          currentAmount={account?.amount || 0}
        />
      </div>
      <div className='widgets'>
        <Widget type='balance' amount={account?.amount || 0} />
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
