import * as React from 'react';
import './UsersList.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Loadingpage from '../../util/loading/Loading';
import {
  GetAllAcounts,
  AccountActivationAPI,
  AccountrejectAPI,
} from '../../util/API';
import Switch from '@material-ui/core/Switch';
import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

CustomToolbar.propTypes = {
  setFilterButtonEl: PropTypes.func.isRequired,
};

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color='primary'
      variant='outlined'
      shape='rounded'
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function UsersAcounts() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.user.userInfo);
  const switchStyles = useN01SwitchStyles();
  const [error, setError] = useState('');
  const [success, setsuccess] = useState('');
  const [filterButtonEl, setFilterButtonEl] = React.useState(null);

  useEffect(() => {
    setLoading(true);

    GetAllAcounts(token).then((data) => {
      const accounts = data.map((account) => ({
        id: account._id,
        accountId: account._id,
        userId: account.user_id,
        amount: account.amount,
        approve: account.isActive,
      }));
      setData(accounts);
      setLoading(false);
    });
  }, [token]);

  //account activation function
  const handleApprove = (id) => {
    console.log(id);
    AccountActivationAPI(id, token).then((data) => {
      if (data.status === false) {
        setLoading(false);
        setError(data.message);
      } else {
        setLoading(false);
        setsuccess(data.message);
        GetAllAcounts(token).then((data) => {
          const accounts = data.map((account) => ({
            id: account._id,
            accountId: account._id,
            userId: account.user_id,
            amount: account.amount,
            approve: account.isActive,
          }));
          setData(accounts);
          setLoading(false);
        });

        setTimeout(() => {
          setsuccess('');
        }, 600);
      }
    });
  };

  //account reject function
  const handleReject = (id) => {
    console.log(id);
    AccountrejectAPI(id, token).then((data) => {
      if (data.status === false) {
        setLoading(false);
        setError(data.message);
      } else {
        setLoading(false);
        setsuccess(data.message);
        GetAllAcounts(token).then((data) => {
          const accounts = data.map((account) => ({
            id: account._id,
            accountId: account._id,
            userId: account.user_id,
            amount: account.amount,
            approve: account.isActive,
          }));
          setData(accounts);
          setLoading(false);
        });

        setTimeout(() => {
          setsuccess('');
        }, 600);
      }
    });
  };

  const columns = [
    { field: 'accountId', headerName: 'Account id', width: 300 },
    { field: 'userId', headerName: 'User id', width: 300 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    {
      field: 'approve',
      headerName: 'Account status',
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Switch
              classes={switchStyles}
              checked={params.value}
              onClick={(e) =>
                params.value
                  ? handleReject(params.id)
                  : handleApprove(params.id)
              }
              onChange={(e) => e.target.checked}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className='usersList'>
      {loading ? (
        <Loadingpage />
      ) : (
        <>
          <div className='usersList__titleContainer'>
            <h3 className='usersList__title'>Users Acounts</h3>
          </div>
          <div className='usersList__table'>
            {error ? (
              <div className='alert alert-danger' role='alert'>
                {error}
              </div>
            ) : (
              ''
            )}
            {success ? (
              <div className='alert alert-success' role='alert'>
                {success}
              </div>
            ) : (
              ''
            )}
            <DataGrid
              sx={{
                fontSize: 15,
                boxShadow: 2,
                border: 2,
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1.6rem !important',
                },
                '& .MuiInput-root': {
                  fontSize: '1.6rem',
                },
              }}
              rows={data}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[3]}
              checkboxSelection
              components={{
                Toolbar: CustomToolbar,
                Pagination: CustomPagination,
              }}
              componentsProps={{
                panel: {
                  anchorEl: filterButtonEl,
                },
                toolbar: {
                  setFilterButtonEl,
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default UsersAcounts;
