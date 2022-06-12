import './dataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userColumns } from '../../../util/tableData';
import { useSelector } from 'react-redux';
import Alert from '../../Alert/Alert';

const DataTable = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [data, setData] = useState([]);
  const { accounts, message } = useSelector((state) => state.accounts);

  useEffect(() => {
    setData(
      accounts &&
        accounts.map((account) => ({
          id: account._id,
          status: account.pending
            ? 'pending'
            : account.isActive
            ? 'active'
            : 'rejected',
          balance: account.amount,
        }))
    );
    setMsg(message);
  }, [accounts, message]);

  const handleClick = (status, id) => {
    if (status === 'active') {
      navigate(`/accounts/${id}`);
    } else {
      setMsg({
        id: Date.now(),
        status: 'error',
        msg: `You can't access ${status} account`,
      });
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            {/* <Link
              to={`/accounts/${params.row.id}`}
              style={{ textDecoration: 'none' }}
            > */}
            <div
              className='viewButton'
              onClick={(e) => handleClick(params.row.status, params.row.id)}
            >
              View Details
            </div>
            {/* </Link> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        Add New Account
        <Link to='/accounts/new' className='link'>
          Add New
        </Link>
      </div>
      {msg && <Alert variant={msg.status} msg={msg.msg} re={msg.id} />}
      <DataGrid
        className='datagrid'
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};
export default DataTable;
