import React from 'react';
import './WidgetLg.scss';

const Button = ({ type }) => (
  <button className={`widgetLg__btn widgetLg__btn--${type}`}>{type}</button>
);

function WidgetLg() {
  return (
    <div className='widgetLg'>
      <h3 className='widgetLg__title'>Latest transactions</h3>
      <table className='widgetLg__table'>
        <thead>
          <tr className='widgetLg__tr'>
            <th className='widgetLg__th'>Customer</th>
            <th className='widgetLg__th'>Date</th>
            <th className='widgetLg__th'>Amount</th>
            <th className='widgetLg__th'>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className='widgetLg__tr'>
            <td className='widgetLg__user'>
              <img
                src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                alt='user'
                className='widgetLg__img'
              />
              <span className='widgetLg__name'>Susan Carol</span>
            </td>
            <td className='widgetLg__date'>2 Jun 2021</td>
            <td className='widgetLg__amount'>EGP122.00</td>
            <td className='widgetLg__status'>
              <Button type='Approved' />
            </td>
          </tr>
          <tr className='widgetLg__tr'>
            <td className='widgetLg__user'>
              <img
                src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                alt='user'
                className='widgetLg__img'
              />
              <span className='widgetLg__name'>Susan Carol</span>
            </td>
            <td className='widgetLg__date'>2 Jun 2021</td>
            <td className='widgetLg__amount'>EGP122.00</td>
            <td className='widgetLg__status'>
              <Button type='Declined' />
            </td>
          </tr>
          <tr className='widgetLg__tr'>
            <td className='widgetLg__user'>
              <img
                src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                alt='user'
                className='widgetLg__img'
              />
              <span className='widgetLg__name'>Susan Carol</span>
            </td>
            <td className='widgetLg__date'>2 Jun 2021</td>
            <td className='widgetLg__amount'>EGP122.00</td>
            <td className='widgetLg__status'>
              <Button type='Pending' />
            </td>
          </tr>
          <tr className='widgetLg__tr'>
            <td className='widgetLg__user'>
              <img
                src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                alt='user'
                className='widgetLg__img'
              />
              <span className='widgetLg__name'>Susan Carol</span>
            </td>
            <td className='widgetLg__date'>2 Jun 2021</td>
            <td className='widgetLg__amount'>EGP122.00</td>
            <td className='widgetLg__status'>
              <Button type='Approved' />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WidgetLg;
