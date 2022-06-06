
import './UsersList.scss';
import React, { useState,useMemo,useEffect } from 'react';
import { MdOutlineWarningAmber, MdCheck, MdDeleteOutline} from 'react-icons/md';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'
import Switch from '@mui/material/Switch';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox'

const gridStyle = { minHeight: 550,
  border: '1px solid #7986cb',
  boxShadow: '0 0 8px 2px rgba(121, 134,203, 0.5)'
 }


const UserList = () => {

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch(`https://banksystem-fwd.herokuapp.com/users`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));

  // })
  const registerRender = ({ value }) => {
    if(value === "aprovel"){
    return (
     <div className='nowrap'>
        <button className='usersList__rejectedBtn'>rejected</button> <button className='usersList__acceptedBtn'>accepted</button></div>)
      }else{
        return (
      <div className={value === 'rejected' ? "usersList__rejected" : "usersList__accepted"}>
     {value === 'rejected'?<MdOutlineWarningAmber/> :<MdCheck/>}{value}
      </div>)}

  }

  const suspendRender = ({ value }) => {
    if(value === "activate"){
    return (
     <div>
        <button className='usersList__rejectedBtn'>suspend</button></div>)
      }else{
        return (
      <div>
     <button className='usersList__acceptedBtn'>activate</button>
    
      </div>
    
     
     )}

  }
  const rowStyle = ({ data }) => {
    const colorMap = {
      suspend: '#ef9a9a',
      // uk: '#ef9a9a'
    }
  
    return {
      backgroundColor: colorMap[data.suspend]
    }
  }
  // const rowClassRules = useMemo(() => {
  //   return {
  //     // row style function
  //     'suspend': (params) => {
  //       var suspend = params.dataSource.suspend;
       
  //     },
  //   };
  // }, []);
   
  // const [sameAddressSwitch, setSameAddressSwitch] = useState("");
  
  // const handleSwitchOnChange = () => {
  //   const newValue = !sameAddressSwitch;
  //   setSameAddressSwitch(newValue);
  // };
  
  const activationRender = ({ value }) => {
  console.log(value)
    // setChecked(value);
//     return (
//       <div>
//         <Switch
//   colorScheme='blue'
//   size='md'
//   defaultChecked={value}
//   onChange={handleSwitchOnChange}
//  /></div>)

  }
const filterValue = [
  { name: 'name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'email', type: 'string', operator: 'contains', value: '' },
  { name: 'phone', operator: 'gte', type: 'number', value: '' },
  { name: 'registerAprovel', operator: 'startsWith', type: 'string', value: '' },
  { name: 'activationRender', operator: 'startsWith', type: 'string', value: '' },
  { name: 'suspendRender', operator: 'startsWith', type: 'string', value: '' },


]

const columns = [
  { name: 'name', sortable: false, header: 'Name', defaultFlex: 1 },
  { name: 'email', header: 'Email', groupBy: false, defaultFlex: 1 },
  { name: 'phone', header: 'Phone', type: 'number', defaultFlex: 1 },
  { name: 'register', header: 'Verifying user', defaultFlex: 1, render: registerRender},
  { name: 'activation', header: 'active/inactive', defaultFlex: 1, render: activationRender},
  { name: 'suspend', header: 'suspend', defaultFlex: 1, render: suspendRender},

 
];

const dataSource = [
  { name: 'Little Johny', email: 'bobby@whocares.com', phone: '+7403 456 768' ,register:"rejected",activation:"false", suspend:"activate" },
  { name: 'John Grayner', email: 'lynda@idont.com', phone: '+7103 66 98 768', register:"accepted",activation:"true", suspend:"activate" },
  { name: 'Mary Stones', email: 'richy@rich.com', phone: '+173 668 08 83' ,register:"rejected",activation:"false", suspend:"activate" },
  { name: 'Robert Fil',email: 'mike@mikey.com', phone: '+075 0628 156 74', register:"accepted",activation:"true", suspend:"suspend"},
  { name: 'Bob Margin',email: 'martin@bobson.com', phone: '+173 5624 675 462', register:"aprovel",activation:"true",suspend:"activate"},
];
// const [pagination, setPagination] = useState(true);
const rowClass = 'suspend';
  return (
    
    <div className='usersList'>
    <div className='usersList__titleContainer'>
      <h3 className='usersList__title'>Users List</h3>
      
    </div>
    <div className='usersList__table'>
    {/* <CheckBox checked={pagination} onChange={setPagination}>
          Pagination
        </CheckBox> */}
    <ReactDataGrid
    
      rowStyle={rowStyle}
      idProperty="id"
      defaultFilterValue={filterValue}
      style={gridStyle}
      columns={columns}
      dataSource={dataSource}
      className="amber-dark"
      pagination
      sortable={false}
      defaultLimit={10}
    />
    </div></div>
  )
}

export default UserList

