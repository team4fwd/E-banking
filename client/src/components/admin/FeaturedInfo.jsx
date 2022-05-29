import React from 'react';
import './FeaturedInfo.scss';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

const FeaturedInfo = () => {
  return (
    <div className='featured'>
      <div className='featured__item'>
        <span className='featured__title'>Revanue</span>
        <div className='featured__money-container'>
          <span className='featured__money'>EGP2.142</span>
          <span className='featured__money-rate'>
            -11.2
            <MdArrowDownward className='featured__icon featured__icon-negative' />
          </span>
        </div>
        <span className='featured__sub'>Compared to last month</span>
      </div>
      <div className='featured__item'>
        <span className='featured__title'>Sales</span>
        <div className='featured__money-container'>
          <span className='featured__money'>EGP1.152</span>
          <span className='featured__money-rate'>
            -1.2
            <MdArrowDownward className='featured__icon featured__icon-negative' />
          </span>
        </div>
        <span className='featured__sub'>Compared to last month</span>
      </div>
      <div className='featured__item'>
        <span className='featured__title'>Cost</span>
        <div className='featured__money-container'>
          <span className='featured__money'>EGP2.352</span>
          <span className='featured__money-rate'>
            +4.2
            <MdArrowUpward className='featured__icon' />
          </span>
        </div>
        <span className='featured__sub'>Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
