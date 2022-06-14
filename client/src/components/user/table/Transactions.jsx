import './Transactions';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { transactionColumns } from '../../../util/tableData';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTransactions } from '../../../store/actions/userTransactionsActions';
import { createTheme, ThemeProvider } from '@mui/material';

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

  console.log(transactions);

  const theme = createTheme({
    typography: {
      htmlFontSize: 10,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className='datatable'>
        <DataGrid
          className='datagrid'
          rows={transactions}
          columns={transactionColumns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </ThemeProvider>
  );
};
export default TransactionLog;
