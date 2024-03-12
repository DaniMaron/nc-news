import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";



function Navbar() {
  const { currentUser } = useContext(UserContext);
  return (
    <nav>
      <div>
        <Link to="/">
          <h1>NC NEWS</h1>
        </Link>
      </div>
      <div>
        <Link to="/topics">
          <h2>All Topics</h2>
        </Link>
        <Link to="/topics">
          <h2>Post new article</h2>
        </Link>
      </div>{" "}
      <div>
        <Link to="/users">
          <img className="avatar" src={currentUser.avatar_url} alt="" />
          <p>
            {currentUser.name} (
            {currentUser.username})
          </p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
