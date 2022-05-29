import React from 'react';
import './Topbar.scss';
import { MdNotificationsNone, MdLanguage, MdSettings } from 'react-icons/md';

function Topbar() {
  return (
    <div className='topbar'>
      <div className='topbar__wrapper'>
        <div className='top-left'>
          <span className='topbar__logo'>E-Admin</span>
        </div>
        <div className='top-right'>
          <div className='topbar__icon'>
            <MdNotificationsNone />
            <span className='topbar__icon-badge'>2</span>
          </div>
          <div className='topbar__icon'>
            <MdLanguage />
            <span className='topbar__icon-badge'>2</span>
          </div>
          <div className='topbar__icon'>
            <MdSettings />
          </div>
          <img
            src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            alt='user-avatar'
            className='topbar__avatar'
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
