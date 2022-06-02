import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './sidebar.scss';
import { Link } from 'react-router-dom';

const Sidebar = ({ setDark }) => {
  return (
    <div className='u-sidebar'>
      <div className='u-sidebar__top'>
        <Link to='/'>
          <span className='u-sidebar__top__logo'>AdminDash</span>
        </Link>
      </div>
      {/* <hr /> */}
      <div className='u-sidebar__center'>
        <ul>
          <p className='u-sidebar__center-title'>MAIN</p>
          <Link to='/'>
            <li>
              <DashboardIcon className='u-sidebar__icon' />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className='u-sidebar__center-title'>LISTS</p>
          <Link to='/accounts'>
            <li>
              <PersonOutlineIcon className='u-sidebar__icon' />
              <span>Accounts</span>
            </li>
          </Link>
          <Link to='/transactions '>
            <li>
              <StoreIcon className='u-sidebar__icon' />
              <span>Transactions</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className='u-sidebar__icon' />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className='u-sidebar__icon' />
            <span>Delivery</span>
          </li>
          <p className='u-sidebar__center-title'>USEFUL</p>
          <li>
            <InsertChartIcon className='u-sidebar__icon' />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className='u-sidebar__icon' />
            <span>Notifications</span>
          </li>
          <p className='u-sidebar__center-title'>SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className='u-sidebar__icon' />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className='u-sidebar__icon' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className='u-sidebar__icon' />
            <span>Settings</span>
          </li>
          <p className='u-sidebar__center-title'>USER</p>
          <li>
            <AccountCircleOutlinedIcon className='u-sidebar__icon' />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className='u-sidebar__icon' />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className='u-sidebar__bottom'>
        <div className='color-option' onClick={() => setDark(false)}></div>
        <div className='color-option' onClick={() => setDark(true)}></div>
      </div>
    </div>
  );
};
export default Sidebar;
