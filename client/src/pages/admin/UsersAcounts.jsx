import * as React from 'react';
import './UsersList.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Loadingpage from '../../util/loading/Loading'
import { GetAllAcounts, AccountActivationAPI} from '../../util/API';


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
      color="primary"
      variant="outlined"
      shape="rounded"
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
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
   
    GetAllAcounts(token).then((data) => {
        // console.log(data);
        const accounts = data.map((account) => ({
          acountId: account._id,
          userId: account.user_id,
          amount: account.amount,
          approve:account.isActive
        }));
        // console.log(accounts);
        setData(accounts);
        setLoading(false);

      });
  }, [token]);
  

  function handleApprove(id) {  
    AccountActivationAPI(id, token)
   .then((data) => data);}


  const columns = [
    {
      field: 'acountId',
      headerName: 'Account id',
      width: 200,
  
    },

    // { field: 'userId', headerName: 'User id', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 120 },

    {
      field: 'approve',
      headerName: 'Approve account',
      width: 150,
      renderCell: (params) => {
      
          if(params === "true"){
          return (
           <div className='nowrap'>
             <p className='usersList__accepted'>
               Approved
             </p>
             </div>)
            }else{
              return (
                <div className='nowrap'>
                <button className='usersList__acceptedBtn' onClick={handleApprove()}>approve account</button>
            </div>)}
      
      },
    },


  ];


  const [filterButtonEl, setFilterButtonEl] = React.useState(null);

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
        <DataGrid
          sx={{
            fontSize: 15,
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
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
      </div> </>)}
    </div>
   
  );
}
export default UsersAcounts;


