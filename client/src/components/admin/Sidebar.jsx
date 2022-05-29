import React from 'react';
import './Sidebar.scss';
import {
  MdLineStyle,
  MdPermIdentity,
  MdStorefront,
  MdAttachMoney,
  MdDynamicFeed,
  // MdTrendingUp,
  // MdBarChart,
  // MdMailOutline,
  // MdChatBubbleOutline,
  // MdWorkOutline,
  // MdTimeline,
  // MdReport,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
            {/* <Link to='user' className='route-link'>
              <li className='sidebar__list-item'>
                <MdPermIdentity className='sidebar__icon' />
                Users
              </li>
            </Link> */}
            <Link to='usersList' className='route-link'>
              <li className='sidebar__list-item'>
                <MdPermIdentity className='sidebar__icon' />
                UsersList
              </li>
            </Link>
            {/* <Link to='products' className='route-link'>
              <li className='sidebar__list-item'>
                <MdStorefront className='sidebar__icon' />
                requests
              </li>
            </Link> */}
       
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
