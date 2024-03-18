import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import logo from '../../src/assets/NCNews.svg'

function Navbar() {
  const { currentUser } = useContext(UserContext);
  return (
    <nav>
      <div className="logotitle">
        <Link to="/">
          <img
            src={logo}
            alt="Blue northcoders logo"
          />
          <h3>NC NEWS</h3>
        </Link>
      </div>

      <div className="navbarLinks">
        <Link to="/topics">
          <h2>Topics</h2>
        </Link>
        <Link to="/authors">
          <h2>Authors</h2>
        </Link>
      </div>

      <div className="avatarNavbar">
        <Link to="/users">
          <img className="avatar" src={currentUser.avatar_url} alt="" />
          <p>{currentUser.name}</p>
          <p>({currentUser.username})</p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
