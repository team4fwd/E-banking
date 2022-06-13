import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './sidebar.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/actions/userActions';

const Sidebar = ({ setDark }) => {
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div className='u-sidebar'>
      <div className='u-sidebar__top'>
        <Link to='/'>
          <AccountBalanceIcon className='u-sidebar__top__logoIcon' />
          <span className='u-sidebar__top__logo'>E-banking</span>
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
              <PeopleAltOutlinedIcon className='u-sidebar__icon' />
              <span>Accounts</span>
            </li>
          </Link>
          <Link to='/transactions '>
            <li>
              <PaidOutlinedIcon className='u-sidebar__icon' />
              <span>Transactions</span>
            </li>
          </Link>
          <p className='u-sidebar__center-title'>USER</p>
          <Link to='/profile '>
            <li>
              <AccountCircleOutlinedIcon className='u-sidebar__icon' />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={logoutHandler}>
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
