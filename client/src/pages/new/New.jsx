import './new.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAccount } from '../../store/actions/userAccountsActions';
import Alert from '../../components/Alert/Alert';

const New = () => {
  const [amount, setAmount] = useState(0);
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user.userInfo);
  const { message } = useSelector((state) => state.accounts);

  useEffect(() => {
    setMsg(message);
  }, [message]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMsg(null);
    if (amount >= 0) {
      dispatch(addUserAccount(amount, token));
    }
    if (amount < 0)
      setMsg({
        id: Date.now(),
        status: 'error',
        msg: 'Amount must be positive number!',
      });
  };

  return (
    <div className='new'>
      {msg && <Alert variant={msg.status} msg={msg.msg} re={msg.id} />}
      <div className='top'>
        <h1>Add New Account</h1>
      </div>
      <div className='bottom'>
        <div className='right'>
          <form onSubmit={submitHandler}>
            <div className='formInput'>
              <label>Amount</label>
              <input
                type='number'
                placeholder='Add inital amount in the account'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button>ADD</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default New;
