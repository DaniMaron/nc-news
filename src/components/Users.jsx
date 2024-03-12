function Users(props) {
  const { usersList } = props;

  return (
      <div>
          <h2>All Users</h2>
          

      {usersList.map((user) => {
          return (
            <div className="userCard">
              <img className="avatar" src={user.avatar_url} alt="" />
              <h3>{user.username}</h3>
                  <h3>{user.name}</h3>
                  <button>Log me in</button>
            </div>
          );
      })}
    </div>
  );
}

export default Users;
