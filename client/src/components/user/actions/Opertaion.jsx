import { useState } from 'react';
import './operation.scss';

const Operation = ({ type }) => {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    switch (type) {
      case 'transfer':
        // call api and pass amount, account ...
        break;
      case 'recharge':
        // call api and add amount to account
        break;
      case 'withdraw':
        // call api and withdraw amount
        break;
      default:
        break;
    }
  };
  return (
    <div className={`operation operation--${type}`}>
      <h2>{type[0].toUpperCase() + type.substring(1)} money</h2>
      <form className={`form form--${type}`} onSubmit={submitHandler}>
        {type === 'transfer' && (
          <input
            type='text'
            className='form__input form__input--to'
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        )}
        <input
          type='number'
          className='form__input form__input--amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className='form__btn form__btn--transfer'>&rarr;</button>
        {type === 'transfer' && (
          <label className='form__label'>Transfer to</label>
        )}
        <label className='form__label'>Amount</label>
      </form>
    </div>
  );
};
export default Operation;
