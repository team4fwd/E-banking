import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import './Admin.scss';

const Admin = () => {
  return (
    <div className='admin'>
      <div className='admin-container'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
