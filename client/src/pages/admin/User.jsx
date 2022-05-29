import React from 'react';
import {
  MdCalendarToday,
  MdLocationSearching,
  MdMailOutline,
  MdPermIdentity,
  MdPhoneAndroid,
  MdPublish,
} from 'react-icons/md';
import './User.scss';

const User = () => {
  return (
    <div className='user'>
      <div className='user__titleContainer'>
        <h3 className='user__title'>Edit User</h3>
      </div>
      <div className='user__container'>
        <div className='user__display'>
          <div className='user__display-top'>
            <img
              src='https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
              className='user__display-img'
            />
            <div className='user__display-title'>
              <span className='user__display-username'>Anna Becker</span>
              <span className='user__display-role'>customer</span>
            </div>
          </div>
          <div className='user__display-bottom'>
            <span className='user__display-details'>Account Details</span>
            <div className='user__display-info'>
              <MdPermIdentity className='user__display-icon' />
              <span className='user__display-info-title'>annabeck44</span>
            </div>
            <div className='user__display-info'>
              <MdCalendarToday className='user__display-icon' />
              <span className='user__display-info-title'>10.12.1999</span>
            </div>
            <span className='user__display-details'>Contact Details</span>
            <div className='user__display-info'>
              <MdPhoneAndroid className='user__display-icon' />
              <span className='user__display-info-title'>+20 101 234 5678</span>
            </div>
            <div className='user__display-info'>
              <MdMailOutline className='user__display-icon' />
              <span className='user__display-info-title'>anna@example.com</span>
            </div>
            <div className='user__display-info'>
              <MdLocationSearching className='user__display-icon' />
              <span className='user__display-info-title'>Cairo | Egypt</span>
            </div>
          </div>
        </div>
        <div className='user__update'>
          <span className='user__update-title'>Edit</span>
          <div className='user__update-form'>
            <div className='user__update-l'>
              <div className='user__update-field'>
                <label>Username</label>
                <input
                  type='text'
                  value='annabeck44'
                  className='user__update-input'
                />
              </div>
              <div className='user__update-field'>
                <label>Full Name</label>
                <input
                  type='text'
                  value='Anna Becker'
                  className='user__update-input'
                />
              </div>
              <div className='user__update-field'>
                <label>Email</label>
                <input
                  type='text'
                  value='anna@example.com'
                  className='user__update-input'
                />
              </div>
              <div className='user__update-field'>
                <label>Phone</label>
                <input
                  type='text'
                  value='+20 101 234 5678'
                  className='user__update-input'
                />
              </div>
              <div className='user__update-field'>
                <label>Address</label>
                <input
                  type='text'
                  value='Cairo | Egypt'
                  className='user__update-input'
                />
              </div>
            </div>
            <div className='user__update-r'>
              <div className='user__update-upload'>
                <img
                  src='https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
                  alt=''
                  className='user__update-img'
                />
                <label htmlFor='img'>
                  <MdPublish className='user__update-icon' />
                </label>
                <input
                  type='file'
                  id='img'
                  className='user__update-inputFile'
                />
              </div>
              <button className='user__update-btn'>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
