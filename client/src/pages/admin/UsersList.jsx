import * as React from 'react';
import './UsersList.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Switch from '@mui/material/Switch';
// import { MdOutlineWarningAmber, MdCheck, MdDeleteOutline } from 'react-icons/md';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Loadingpage from '../../util/loading/Loading'
import { Button,Modal} from 'react-bootstrap';  
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
  const [sameAddressSwitch, setSameAddressSwitch] = useState();
  const [show, setShow] = useState(false);

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
          register: user
        }));
        setData(users);
        setLoading(false);

      });
  }, [token]);
  

  const handleactivate = (id) => {
    // console.log(id)
    activationAPI(id, token)
   .then((data) => 
   console.log(data)
   
   );}


   function handlesuspend(id){
   suspendAPI(id, token)
   .then((data) => data);}



  const handleSwitchOnChange = () => {
    const newValue = !sameAddressSwitch;
    setSameAddressSwitch(newValue);
  };



  const columns = [
    {
      field: 'username',
      headerName: 'Name',
      width: 200,
  
    },

    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 120 },
    // { field: 'transactions', headerName: 'Transactions', width: 160 },
    {
      field: 'register',
      headerName: 'Verifying user',
      width: 150,
      renderCell: (params) => {
        return (<button className='usersList__acceptedBtn' onClick={() =>handleactivate(params.id)}>activate</button>)
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
    {
      field: 'aproveRequest',
      headerName: 'Aprove request',
      width: 150,
      renderCell: (params) => {

        const handleShow = () => setShow(params);
        return (
          <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >         
         <Button variant="primary" onClick={handleShow}>
          Launch Form modal
        </Button>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <></>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >Close Modal</Button>
        </Modal.Footer>
      </Modal>
        </div>  


        )
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


