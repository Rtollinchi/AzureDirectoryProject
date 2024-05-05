import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        const usersData = Array.isArray(response.data.value)
          ? response.data.value
          : [];
        setUsers(usersData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.displayName}</h3> {/* Display Name */}
            <p><strong>Given Name:</strong> {user.givenName}</p> {/* Given Name */}
            <p><strong>Surname:</strong> {user.surname}</p> {/* Surname */}
            <p><strong>Email:</strong> {user.userPrincipalName}</p> {/* User Principal Name */}
            {user.jobTitle && <p><strong>Job Title:</strong> {user.jobTitle}</p>} {/* Job Title, shown only if available */}
            {/* Add any other user details you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
