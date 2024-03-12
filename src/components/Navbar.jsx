import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">
          <h1>NC NEWS</h1>
        </Link>
      </div>
      <div>
        <Link to="/topics">
          <h2>Topics</h2>
        </Link>
        <Link to="/topics">
          <h2>Post new article</h2>
        </Link>
      </div>{" "}
      <div>
        <Link to="/users">
          {" "}
          <img
            className="avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfeaHt6bgx8b0OIR48Lpt5caksPWrpb8VvfQ&usqp=CAU"
            alt=""
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
