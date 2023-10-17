import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get id from route parameters

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getUser/${id}`);
        const userData = response.data; // Assuming response.data contains user data
        setUsername(userData.name);
        setEmail(userData.email);
        setAge(userData.age);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/updateUser/${id}`, { name, email, age })
      .then((response) => {
        console.log("User updated successfully", response);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating user", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12">
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Update User+</h2>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                autoComplete="name"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className="form-control"
                autoComplete="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Update +
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
