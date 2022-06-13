import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  operateMoney,
  transferMoney,
} from '../../../store/actions/userAccountsActions';
import Alert from '../../Alert/Alert';
import './operation.scss';

const Operation = ({ type, token, id, currentAmount }) => {
  const [msg, setMsg] = useState(null);
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState('');
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.accounts);

  useEffect(() => {
    setMsg(message);
  }, [message]);

  useEffect(() => {
    setMsg(null);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setMsg(null);
    if (amount < 0) {
      setMsg({
        id: Date.now(),
        status: 'error',
        msg: 'Amount must be positive!',
      });
      setAmount(0);
      return;
    }
    switch (type) {
      case 'transfer':
        dispatch(transferMoney(to, id, amount, token));
        setAmount(0);
        break;
      case 'recharge':
        dispatch(operateMoney(type, id, amount, token));
        setAmount(0);
        break;
      case 'withdrow':
        if (amount > currentAmount) {
          setMsg({
            id: Date.now(),
            status: 'error',
            msg: `you can't withdraw more than ${currentAmount}`,
          });
          return;
        }
        dispatch(operateMoney(type, id, amount, token));
        setAmount(0);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`operation operation--${type}`}>
      {msg && <Alert variant={msg.status} msg={msg.msg} re={msg.id} />}
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
