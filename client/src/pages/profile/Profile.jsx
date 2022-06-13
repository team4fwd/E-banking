import { useSelector } from 'react-redux';
import './profile.scss';
import profileImg from '../../profile.png';

const Profile = () => {
  const { name, phone, email } = useSelector(({ user }) => user.userInfo);
  return (
    <div className='profile'>
      <div className='profile__wrapper'>
        {/* <div className='editButton'>Edit</div> */}
        <h1 className='title'>Information</h1>
        <div className='item'>
          <img src={profileImg} alt='' className='itemImg' />
          <div className='details'>
            <h1 className='itemTitle'>{name}</h1>
            <div className='detailItem'>
              <span className='itemKey'>Email:</span>
              <span className='itemValue'>{email}</span>
            </div>
            <div className='detailItem'>
              <span className='itemKey'>Phone:</span>
              <span className='itemValue'>{phone}</span>
            </div>
            {/* <div className='detailItem'>
              <span className='itemKey'>Address:</span>
              <span className='itemValue'>
                Elton St. 234 Garden Yd. NewYork
              </span>
            </div>
            <div className='detailItem'>
              <span className='itemKey'>Country:</span>
              <span className='itemValue'>USA</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
