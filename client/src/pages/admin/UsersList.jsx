import React from 'react'
import './UsersList.scss';
import { MdDeleteOutline } from 'react-icons/md';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'

const gridStyle = { minHeight: 550,
  border: '1px solid #7986cb',
  boxShadow: '0 0 8px 2px rgba(121, 134,203, 0.5)' }
const filterValue = [
  { name: 'name', operator: 'startsWith', type: 'string', value: '' },
  { name: 'email', type: 'string', operator: 'contains', value: '' },
  { name: 'phone', operator: 'gte', type: 'number', value: '' },]

const columns = [
  { name: 'name', sortable: false, header: 'Name', defaultFlex: 1 },
  { name: 'email', header: 'Email', groupBy: false, defaultFlex: 1 },
  { name: 'phone', header: 'Phone', type: 'number', defaultFlex: 1 },

];

const dataSource = [
  { name: 'Little Johny', email: 'bobby@whocares.com', phone: '+7403 456 768'  },
  { name: 'John Grayner', email: 'lynda@idont.com', phone: '+7103 66 98 768' },
  { name: 'Mary Stones', email: 'richy@rich.com', phone: '+173 668 08 83' },
  { name: 'Robert Fil',email: 'mike@mikey.com', phone: '+075 0628 156 74' },
  { name: 'Bob Margin',email: 'martin@bobson.com', phone: '+173 5624 675 462' },
];

const UserList = () => {
  return (
    <div className='usersList'>
    <div className='usersList__titleContainer'>
      <h3 className='usersList__title'>Users List</h3>
      
    </div>
    <div className='usersList__table'>
    <ReactDataGrid
      idProperty="id"
      defaultFilterValue={filterValue}
      style={gridStyle}
      columns={columns}
      dataSource={dataSource}
      className="amber-dark"
    />
    </div></div>
  )
}

export default UserList