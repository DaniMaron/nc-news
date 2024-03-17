import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function Navbar() {
  const { currentUser } = useContext(UserContext);
  return (
    <nav>
      <div className="logotitle">
        <Link to="/">
          <img src="./src/assets/NCNews.svg" alt="" />
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
