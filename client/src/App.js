import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import AdminHome from './pages/admin/AdminHome';
import UsersList from './pages/admin/UsersList';
import User from './pages/admin/User';
import Layout from './components/user/layout/Layout';
import Home from './pages/home/Home';
import Account from './pages/account/Account';
import { userInputs } from './util/formData';
import { useState } from 'react';
import './styles/dark.scss';
import List from './pages/list/List';
import New from './pages/new/New';
import Transactions from './pages/transactions/Transactions';

const App = () => {
  const [dark, setDark] = useState(false);

  return (
    <div className={`user-view ${dark ? 'dark' : ''}`}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout setDark={setDark} />}>
            <Route index element={<Home />} />
            <Route path='accounts'>
              <Route index element={<List />} />
              <Route path=':userId' element={<Account />} />
              <Route
                path='new'
                element={<New inputs={userInputs} title='Add New User' />}
              />
            </Route>
            <Route path='transactions' element={<Transactions />} />
          </Route>
          <Route path='/admin' element={<Admin />}>
            <Route index element={<AdminHome />} />
            <Route path='home' element={<AdminHome />} />
            <Route path='user' element={<User />} />
            <Route path='usersList' element={<UsersList />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
