import './Transactions';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { transactionColumns } from '../../../util/tableData';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTransactions } from '../../../store/actions/userTransactionsActions';

const TransactionLog = () => {
  const [transactions, setTransactions] = useState([]);
  const userTransactions = useSelector(({ transactions }) => transactions);
  const { token } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTransactions(token));
  }, [dispatch, token]);

  useEffect(() => {
    setTransactions(userTransactions);
  }, [userTransactions]);

  return (
    <div className='datatable'>
      <DataGrid
        className='datagrid'
        rows={transactions}
        columns={transactionColumns}
        pageSize={8}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};
export default TransactionLog;
