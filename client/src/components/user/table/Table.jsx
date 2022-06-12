import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserTransactions } from '../../../store/actions/userTransactionsActions';

const TableHeadCell = styled(TableCell)`
  font-weight: bold;
  font-size: 1.8rem;
`;

const TableList = () => {
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
    <TableContainer component={Paper} className='table'>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableHeadCell className='table__cell'>ID</TableHeadCell>
            <TableHeadCell className='table__cell'>
              Account Number
            </TableHeadCell>
            <TableHeadCell className='table__cell'>Transaction</TableHeadCell>
            <TableHeadCell className='table__cell'>Amount</TableHeadCell>
            <TableHeadCell className='table__cell'>sender</TableHeadCell>
            <TableHeadCell className='table__cell'>receiver</TableHeadCell>
            <TableHeadCell className='table__cell'>Date</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((trans) => (
            <TableRow key={trans.id}>
              <TableCell className='table__cell'>{trans.id}</TableCell>
              <TableCell className='table__cell'>
                {trans.accountNumber}
              </TableCell>
              <TableCell color='error' className='table__cell'>
                {trans.type}
              </TableCell>
              <TableCell className='table__cell'>{trans.amount}</TableCell>
              <TableCell className='table__cell'>{trans.receiver}</TableCell>
              <TableCell className='table__cell'>{trans.sender}</TableCell>
              <TableCell className='table__cell'>{trans.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
