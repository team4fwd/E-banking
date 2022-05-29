import React from 'react';
import './WidgetSm.scss';
import { MdVisibility } from 'react-icons/md';

function WidgetSm() {
  return (
    <div className='widgetSm'>
      <span className='widgetSm__title'>New Members</span>
      <ul className='widgetSm__list'>
        <li className='widgetSm__item'>
          <img
            src='https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt='user'
            className='widgetSm__img'
          />
          <div className='widgetSm__user'>
            <span className='widgetSm__user-name'>Anna Keller</span>
          </div>
          <button className='widgetSm__btn'>
            <MdVisibility className='widgetSm__icon' /> Display
          </button>
        </li>
        <li className='widgetSm__item'>
          <img
            src='https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt='user'
            className='widgetSm__img'
          />
          <div className='widgetSm__user'>
            <span className='widgetSm__user-name'>Anna Keller</span>
          </div>
          <button className='widgetSm__btn'>
            <MdVisibility className='widgetSm__icon' /> Display
          </button>
        </li>
        <li className='widgetSm__item'>
          <img
            src='https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt='user'
            className='widgetSm__img'
          />
          <div className='widgetSm__user'>
            <span className='widgetSm__user-name'>Anna Keller</span>
          </div>
          <button className='widgetSm__btn'>
            <MdVisibility className='widgetSm__icon' /> Display
          </button>
        </li>
        <li className='widgetSm__item'>
          <img
            src='https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt='user'
            className='widgetSm__img'
          />
          <div className='widgetSm__user'>
            <span className='widgetSm__user-name'>Anna Keller</span>
          </div>
          <button className='widgetSm__btn'>
            <MdVisibility className='widgetSm__icon' /> Display
          </button>
        </li>
        <li className='widgetSm__item'>
          <img
            src='https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt='user'
            className='widgetSm__img'
          />
          <div className='widgetSm__user'>
            <span className='widgetSm__user-name'>Anna Keller</span>
          </div>
          <button className='widgetSm__btn'>
            <MdVisibility className='widgetSm__icon' /> Display
          </button>
        </li>
      </ul>
    </div>
  );
}

export default WidgetSm;
