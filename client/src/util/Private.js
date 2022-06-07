import { Navigate } from 'react-router-dom';

const Private = ({ Component }) => {
  const loggedIn = !!localStorage.getItem('userInfo');
  return loggedIn ? <Component /> : <Navigate to='/login' />;
};

export default Private;
