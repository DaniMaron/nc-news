import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function Users(props) {
  const { usersList } = props;
  const { setCurrentUser } = useContext(UserContext)


  function logUserIn(event) {
    setCurrentUser(JSON.parse(event.target.value))
  }

  return (
      <div>
          <h2>All Users</h2>
          

      {usersList.map((user) => {
          return (
            <div className="userCard" key={user.username}>
              <img className="avatar" src={user.avatar_url} alt="" />
              <h3>{user.username}</h3>
                  <h3>{user.name}</h3>
                  <button value={JSON.stringify(user)} onClick={logUserIn}>Log me in</button>
            </div>
          );
      })}
    </div>
  );
}

export default Users;
