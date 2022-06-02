import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './layout.scss';

const Layout = ({ setDark }) => {
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
