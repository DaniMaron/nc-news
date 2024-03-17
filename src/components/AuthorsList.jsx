import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../api";

const AuthorsList = () => {
  const [authorsList, setAuthorsList] = useState([])
        fetchUsers().then((users) => {
          setAuthorsList(users);
        });
  
  return (
    <div className="content">
      <h2>Authors</h2>
      <div>
        {authorsList.map((user) => {
          return (
            <div className="topicCard" key={user.name}>
              <Link to={"/authors/" + user.username} key={user.name}>
                <h3>{user.name} ({user.username})</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuthorsList;
