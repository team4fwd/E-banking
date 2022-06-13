import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Admin from './pages/admin/Admin';
import AdminHome from './pages/admin/AdminHome';
import UsersList from './pages/admin/UsersList';
import UsersAcounts from './pages/admin/UsersAcounts';

import Layout from './components/user/layout/Layout';
import Home from './pages/home/Home';
import Account from './pages/account/Account';
import { userInputs } from './util/formData';
import { useState } from 'react';
import './styles/dark.scss';
import List from './pages/list/List';
import New from './pages/new/New';
import Transactions from './pages/transactions/Transactions';
import Login from './pages/login/Login';
import Signup from './pages/signup/signup';
import LoadingBar from 'react-redux-loading-bar';
import { useSelector } from 'react-redux';

const App = () => {
  const [dark, setDark] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const isActive = userInfo?.isActive;
  const isAdmin = userInfo?.isAdmin;

  return (
    <div className={`user-view ${dark ? 'dark' : ''}`}>
      <Router>
        <LoadingBar showFastActions />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/'
            element={
              isActive ? <Layout setDark={setDark} /> : <Navigate to='/login' />
            }
          >
            <Route index element={<Home />} />
            <Route path='accounts'>
              <Route index element={<List />} />
              <Route path=':id' element={<Account />} />
              <Route
                path='new'
                element={<New inputs={userInputs} title='Add New User' />}
              />
            </Route>
            <Route path='transactions' element={<Transactions />} />
          </Route>
          {isAdmin && (
            <Route path='/admin' element={<Admin />}>
              <Route index element={<AdminHome />} />
              <Route path='home' element={<AdminHome />} />
              <Route path='usersList' element={<UsersList />} />
              <Route path='usersAcounts' element={<UsersAcounts />} />
            </Route>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
