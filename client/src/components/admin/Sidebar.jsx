import React from 'react';
import './Sidebar.scss';
import {
  MdLineStyle,
  MdPermIdentity,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../store/actions/userActions';
import { useDispatch } from 'react-redux';
import {MdAccountCircle, MdOutlineLogout} from 'react-icons/md';

const Sidebar = () => {
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    
  };
  return (
    <div className='sidebar'>
      <div className='sidebar__wrapper'>
        <div className='sidebar__menu'>
          <h3 className='sidebar__title'>Dashboard</h3>
          <ul className='sidebar__list'>
            <Link to='home' className='route-link'>
              <li className='sidebar__list-item active'>
                <MdLineStyle className='sidebar__icon' />
                Home
              </li>
            </Link>
          
          </ul>
        </div>
        <div className='sidebar__menu'>
          <h3 className='sidebar__title'>Quick Menu</h3>
          <ul className='sidebar__list'>
        
            <Link to='usersList' className='route-link'>
              <li className='sidebar__list-item'>
                <MdPermIdentity className='sidebar__icon' />
                <span>Users List</span>
              </li>
            </Link>
            <Link to='usersAcounts' className='route-link'>
              <li className='sidebar__list-item'>
                <MdAccountCircle className='sidebar__icon' />
                <span>Users acounts</span>
              </li>
            </Link>

          <Link to='/login' className='route-link'>
              <li className='sidebar__list-item' onClick={logoutHandler}>
              <MdOutlineLogout className='sidebar__icon' />
            <span>Logout</span>
              </li>
            </Link>
        
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
