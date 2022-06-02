import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useState } from 'react';

const Navbar = ({ setDark }) => {
  const [toggle, setToggle] = useState();

  return (
    <div className='u-navbar'>
      <div className='u-navbar__wrapper'>
        <div className='u-navbar__search'>
          <input type='text' placeholder='Search...' />
          <SearchOutlinedIcon />
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
          <div className='u-navbar__item'>
            <FullscreenExitOutlinedIcon className='icon' />
          </div>
          <div className='u-navbar__item'>
            <NotificationsNoneOutlinedIcon className='icon' />
            <div className='counter'>1</div>
          </div>
          <div className='u-navbar__item'>
            <ChatBubbleOutlineOutlinedIcon className='icon' />
            <div className='counter'>2</div>
          </div>
          <div className='u-navbar__item'>
            <ListOutlinedIcon className='icon' />
          </div>
          <div className='u-navbar__item'>
            <img
              src='https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
              className='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
