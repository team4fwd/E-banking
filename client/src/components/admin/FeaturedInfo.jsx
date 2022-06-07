import React from 'react';
import './FeaturedInfo.scss';
import { MdPerson, MdPersonAddAlt1} from 'react-icons/md';

const FeaturedInfo = () => {
  return (
    <div className='featured'>
      <div className='featured__item'>
        <span className='featured__title'>TODAY NEW USERS</span>
        <div className='featured__money-container'>
          <span className='featured__money'>20</span>
          <span className='featured__money-rate'>
            <MdPersonAddAlt1 className='featured__icon featured__icon' />
          </span>
        </div>
        <span className='featured__sub'>3.154 Total Users</span>
      </div>
      <div className='featured__item'>
        <span className='featured__title'>TODAY CTIVE USERS</span>
        <div className='featured__money-container'>
          <span className='featured__money'>230</span>
          <span className='featured__money-rate'>
            <MdPerson className='featured__icon featured__icon-negative' />
          </span>
        </div>
        <span className='featured__sub'>20% of the total users</span>
      </div>
      {/* <div className='featured__item'>
        <span className='featured__title'>Cost</span>
        <div className='featured__money-container'>
          <span className='featured__money'>EGP2.352</span>
          <span className='featured__money-rate'>
            +4.2
            <MdArrowUpward className='featured__icon' />
          </span>
        </div>
        <span className='featured__sub'>Compared to last month</span>
      </div> */}
    </div>
  );
};

export default FeaturedInfo;
