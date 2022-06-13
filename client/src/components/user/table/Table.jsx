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
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const TableHeadCell = styled(TableCell)`
  font-weight: bold;
  font-size: 1.8rem;
`;

const TableList = ({ id }) => {
  const [transactions, setTransactions] = useState([]);
  const userTransactions = useSelector(({ transactions }) => transactions);

  useEffect(() => {
    if (id) {
      setTransactions(
        userTransactions
          .filter((trans) => trans.accountNumber === id)
          .slice(0, 11)
      );
    } else {
      setTransactions(userTransactions.slice(0, 11));
    }
  }, [userTransactions, id]);

  return (
    <TableContainer
      sx={{ maxHeight: 500, maxWidth: '100%' }}
      component={Paper}
      className='table'
    >
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableHeadCell className='table__cell'>ID</TableHeadCell>
            <TableHeadCell className='table__cell'>
              Account Number
            </TableHeadCell>
            <TableHeadCell className='table__cell'>Transaction</TableHeadCell>
            <TableHeadCell className='table__cell'>Amount</TableHeadCell>
            <TableHeadCell className='table__cell'>Date</TableHeadCell>
            <TableHeadCell className='table__cell'>sender</TableHeadCell>
            <TableHeadCell className='table__cell'>receiver</TableHeadCell>
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
              <TableCell className='table__cell'>{trans.date}</TableCell>
              <TableCell className='table__cell'>{trans.receiver}</TableCell>
              <TableCell className='table__cell'>{trans.sender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
