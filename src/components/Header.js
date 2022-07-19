import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="Header">
      <h1> &infin; Infinite Query &amp; Scroll</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/first">Clean React</Link>
          </li>
          <li>
            <Link to="/second">React Query</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
