import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { rows } from '../../../util/tableData';
import styled from '@emotion/styled';

const TableHeadCell = styled(TableCell)`
  font-weight: bold;
  font-size: 1.8rem;
`;

const TableList = () => {
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableHeadCell className='table__cell'>ID</TableHeadCell>
            <TableHeadCell className='table__cell'>
              Account Number
            </TableHeadCell>
            <TableHeadCell className='table__cell'>Transaction</TableHeadCell>
            <TableHeadCell className='table__cell'>Date</TableHeadCell>
            <TableHeadCell className='table__cell'>Amount</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='table__cell'>{row.id}</TableCell>
              <TableCell className='table__cell'>{row.account}</TableCell>
              <TableCell className='table__cell'>{row.type}</TableCell>
              <TableCell className='table__cell'>{row.amount}</TableCell>
              <TableCell className='table__cell'>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
