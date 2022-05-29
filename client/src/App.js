import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import AdminHome from './pages/admin/AdminHome';
import UsersList from './pages/admin/UsersList';
import User from './pages/admin/User';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path='/admin' element={<Admin />}>
            <Route index element={<AdminHome />} />
            <Route path='home' element={<AdminHome />} />
            <Route path='user' element={<User />} />
            <Route path='usersList' element={<UsersList />} />

           
          </Route>
      </Routes>
    </Router>
  )
};

export default App;
