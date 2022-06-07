import * as React from 'react';
import './UsersList.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
import { MdOutlineWarningAmber, MdCheck, MdDeleteOutline } from 'react-icons/md';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Loadingpage from '../../util/loading/Loading'

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

function UsersList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    setLoading(true);
    fetch('https://e-commerce-fwd.herokuapp.com/users', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const users = data.map((user) => ({
          id: user._id,
          username: `${user.firstName} ${user.lastName}`,
          email: user.email,
        }));
        console.log(users);
        setData(users);
        setLoading(false);

      });
  }, [token]);
  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   visibleFields: VISIBLE_FIELDS,
  //   rowLength: 100,
  // });
  const [sameAddressSwitch, setSameAddressSwitch] = useState();
  const handleSwitchOnChange = () => {
    const newValue = !sameAddressSwitch;
    setSameAddressSwitch(newValue);
  };

  const handleDeleteUser = (id) => {
    setData((currusers) => currusers.filter((user) => user.id !== id));
  };

  const columns = [
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => (
        <div className='usersList__user'>
          {/* <img src={params.row.avatar} alt='' className='usersList__user-img' /> */}
          {params.row.username}
        </div>
      ),
    },

    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 120 },
    // { field: 'transactions', headerName: 'Transactions', width: 160 },
    {
      field: 'register',
      headerName: 'Verifying user',
      width: 150,
      renderCell: (params) => {
        return (<button className='usersList__acceptedBtn'>accepted</button>)
        // if(params === "aprovel"){
        //   return (
        //    <div className='nowrap'>
        //       <button className='usersList__rejectedBtn'>rejected</button> <button className='usersList__acceptedBtn'>accepted</button></div>)
        //     }else{
        //       return (
        //     <div className={params === 'rejected' ? "usersList__rejected" : "usersList__accepted"}>
        //    {params === 'rejected'?<MdOutlineWarningAmber/> :<MdCheck/>}{params}
        //     </div>)}
      },
    },



    {
      field: 'activation',
      headerName: 'Active/Inactive',
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Switch
              size='md'
              // defaultChecked={params}
              onChange={handleSwitchOnChange}
            /></div>)
      },
    },


    {
      field: 'suspend',
      headerName: 'suspend',
      width: 150,
      renderCell: (params) => {
        return (<button className='usersList__rejectedBtn'>suspend</button>)
        //     if(value === "activate"){
        // return (
        //  <div>
        //     <button className='usersList__rejectedBtn'>suspend</button></div>)
        //   }else{
        //     return (
        //   <div>
        //  <button className='usersList__acceptedBtn'>activate</button>

        //   </div>


        //  )}
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
        <h3 className='usersList__title'>Users List</h3>
        {/* <Link to='newuser'>
          <button className='usersList__add-btn'>Create</button>
        </Link> */}
      </div>
      <div className='usersList__table'>
        {/* <div style={{ height: 400, width: '100%' }}> */}
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
        {/* </div> */}
      </div> </>)}
    </div>
   
  );
}
export default UsersList;


