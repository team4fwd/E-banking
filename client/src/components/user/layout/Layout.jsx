import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getUserAccounts } from '../../../store/actions/userAccountsActions';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './layout.scss';

const Layout = ({ setDark }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo.isActive) {
      dispatch(getUserAccounts(userInfo.token));
    }
  }, []);

  return (
    <div className='layout'>
      <Sidebar setDark={setDark} />
      <div className='layout__container'>
        <Navbar setDark={setDark} />
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
