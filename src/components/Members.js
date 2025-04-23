import { Link, useNavigate } from 'react-router-dom';

function Members({ onLogout }) {
  const navigate = useNavigate();

  // get all users from the local storage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  // get the logged in user from the local storage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleViewProfile = (user) => {
    // get the profile of the user from the local storage
    localStorage.setItem('SelectedProfile', JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    onLogout();
    navigate('/');
  };

  return (
    <div>
      {loggedInUser && (
        <div className="welcome-logout">
          <h3 className="members-title">Welcome, {loggedInUser.name}!</h3>
          <Link className="logout" to="/" onClick={handleLogout}>
            Log Out
          </Link>
        </div>
      )}

      <h1 className="members-title">LinkedIn Members:</h1>
      <div className="members-list">
        <ul>
          {users.map((user) => (
            <li key={user.email}>
              <span>{user.name}</span>
              <Link
                to="/profile"
                onClick={() => handleViewProfile(user)}
                className="view-profile"
              >
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Members;
