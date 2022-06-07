import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/actions/userActions';
import { useDispatch } from 'react-redux';

const Navbar = ({ setDark }) => {
  const [toggle, setToggle] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const handleClick = (e) => setOpen(e.currentTarget);
  const handleClose = (e) => {
    console.log(e.currentTarget.textContent);
    setOpen(null);
    if (e.currentTarget.textContent === 'My accounts') navigate('/accounts');
    if (e.currentTarget.textContent === 'Logout') dispatch(logoutUser());
  };
  console.log(open);

  return (
    <div className='u-navbar'>
      <div className='u-navbar__wrapper'>
        <div className='u-navbar__search'>
          <input type='text' placeholder='Search...' />
          <SearchOutlinedIcon sx={{ fontSize: '2rem' }} />
        </div>
        <div className='u-navbar__items'>
          <div className='u-navbar__item'>
            <LanguageOutlinedIcon className='icon' />
            English
          </div>
          <div className='u-navbar__item'>
            {toggle && (
              <DarkModeOutlinedIcon
                className='icon'
                onClick={() =>
                  setDark((prev) => {
                    setToggle(prev);
                    return !prev;
                  })
                }
              />
            )}
            {!toggle && (
              <LightModeOutlinedIcon
                className='icon'
                onClick={() =>
                  setDark((prev) => {
                    setToggle(prev);
                    return !prev;
                  })
                }
              />
            )}
          </div>
          {/* <div className='u-navbar__item'>
            <FullscreenExitOutlinedIcon className='icon' />
          </div> */}
          <div className='u-navbar__item'>
            <NotificationsNoneOutlinedIcon className='icon' />
            <div className='counter'>1</div>
          </div>
          {/* <div className='u-navbar__item'>
            <ChatBubbleOutlineOutlinedIcon className='icon' />
            <div className='counter'>2</div>
          </div> */}
          <div
            className='u-navbar__item'
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            id='avatar'
          >
            <ListOutlinedIcon className='icon' />
          </div>
          <div className='u-navbar__item' onClick={handleClick}>
            <img
              src='https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
              className='avatar'
            />
          </div>
          <Menu
            id='menu'
            anchorEl={open}
            open={!!open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'menu',
            }}
            sx={{ fontSize: '1.8rem' }}
          >
            <MenuItem sx={{ fontSize: '1.3rem' }} onClick={handleClose}>
              My accounts
            </MenuItem>
            <MenuItem sx={{ fontSize: '1.3rem' }} onClick={handleClose}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
