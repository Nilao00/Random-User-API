import { Link } from 'react-router-dom';
import { Nav, NavLinks } from './styles';

const Navbar = () => {
    return (
      <Nav>
        <h1>Random User API</h1>
        <NavLinks>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Usuários</Link>
          </li>
        </NavLinks>
      </Nav>
    );
  };
  
  export default Navbar;
  