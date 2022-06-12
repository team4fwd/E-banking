import * as React from 'react';
import './UsersList.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MdOutlineWarningAmber, MdCheck} from 'react-icons/md';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Loadingpage from '../../util/loading/Loading'
import { GetAllUsersAPI, activationAPI, suspendAPI} from '../../util/API';

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
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function UsersList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.user.userInfo);
  const [error, setError] = useState('');
  const [success, setsuccess] = useState('');
  const [filterButtonEl, setFilterButtonEl] = React.useState(null);


  useEffect(() => {
    setLoading(true);
   
    GetAllUsersAPI(token)
    .then((data) => {
        console.log(data);
        const users = data.map((user) => ({
          id: user._id,
          username: user.name,
          email: user.email,
          phone: user.phone,
          register: user.isActive,
          suspend:user.isOpen
        }));
        setData(users);
        setLoading(false);

      });
  }, [token]);
  
//user activation to can he login 
  const handleactivate = (id) => {
    activationAPI(id, token)
   .then((data) =>  {
          if (data.status === false) {
            setLoading(false);
            setError(data.message);
          } else {
            setLoading(false);
            setsuccess(data.message);

            GetAllUsersAPI(token).then((data) => {
              console.log(data);
              const users = data.map((user) => ({
                id: user._id,
                username: user.name,
                email: user.email,
                phone: user.phone,
                register: user.isActive,
                suspend:user.isOpen
              }));
              setData(users);
              setLoading(false);
            })

            setTimeout(() => {
              setsuccess("");
          },600)
          }         
        }   
   );
  }

// suspend the user to cann't login
   function handlesuspend(id){
   suspendAPI(id, token)
   .then((data) =>  {
          if (data.status === false) {
            setLoading(false);
            setError(data.message);
          } else {
            setLoading(false);
            setsuccess(data.message);

            setTimeout(() => {
              setsuccess("");
              
          },600)
          
          }
          GetAllUsersAPI(token).then((data) => {
            console.log(data);
            const users = data.map((user) => ({
              id: user._id,
              username: user.name,
              email: user.email,
              phone: user.phone,
              register: user.isActive,
              suspend:user.isOpen
            }));
            setData(users);
            setLoading(false);
    
          }) 
        }   
   );
  }


  const columns = [
    {
      field: 'username',
      headerName: 'Name',
      width: 200,
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 120 },
    {
      field: 'register',
      headerName: 'Verifying user',
      width: 150,
      renderCell: (params) => {
        if(params.value === false){
          return (
            <button className='usersList__acceptedBtn' onClick={() => handleactivate(params.id)}>activate</button>
            )
            }else{
              return (
            <div className={"usersList__accepted nowrap"}><p><MdCheck/> activated</p>
            </div>)}
      },
    },

    {
      field: 'suspend',
      headerName: 'suspend',
      width: 150,
      renderCell: (params) => {
        if(params.value === true){
          return (
            <button className='usersList__rejectedBtn' onClick={() => handlesuspend(params.id)}>suspend</button>
            )
            }else{
              return (
            <div className={"usersList__rejected nowrap"}><p><MdOutlineWarningAmber/> suspended</p>
            </div>)}
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
        <h3 className='usersList__title'>Users List</h3>
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
export default UsersList;


