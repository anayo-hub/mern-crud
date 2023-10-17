import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./User.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/") // Correct API endpoint URL
      .then((result) => {
        setUsers(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  return (
    <div className="container users-container mt-4">
      <h2 className="mb-4 text-center">User List</h2>
      <Link to="/create" className="btn btn-success mb-3 d-block mx-auto">
        Add User+
      </Link>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td className="action-buttons text-center">
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-primary btn-sm mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
