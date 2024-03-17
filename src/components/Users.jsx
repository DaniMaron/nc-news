import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { fetchUsers } from "../../api";

function UsersList(props) {
  const { usersList, setUsersList } = props;
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate()

      fetchUsers().then((users) => {
        setUsersList(users);
      });

  function logUserIn(event) {
    setCurrentUser(JSON.parse(event.target.value));
    navigate(-1)
  }

  return (
    <div className="content">
      <h2>All Users</h2>

      {usersList.map((user) => {
        return (
          <div className="userCard" key={user.username}>
            <img className="avatar" src={user.avatar_url} alt="" />
            <h3>{user.username}</h3>
            <h3>{user.name}</h3>
            <button value={JSON.stringify(user)} onClick={logUserIn}>
              Log me in
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
