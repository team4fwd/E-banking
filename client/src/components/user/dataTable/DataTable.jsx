import './dataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userColumns } from '../../../util/tableData';
import { useSelector } from 'react-redux';

const DataTable = () => {
  const [data, setData] = useState([]);
  const { accounts } = useSelector((state) => state.accounts);

  useEffect(() => {
    setData(
      accounts.map((account) => ({
        id: account._id,
        status: account.isActive ? 'active' : 'pending',
        balance: account.amount,
      }))
    );
  }, [accounts]);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link
              to={`/accounts/${params.row.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className='viewButton'>View Details</div>
            </Link>
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
