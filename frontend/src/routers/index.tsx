import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Home from '../pages/Home';
import UsersList from '../pages/UserLists';

const Routers = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
  );
};

export default Routers;
