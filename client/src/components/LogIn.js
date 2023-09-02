import { useEffect, useState } from "react";
import axios from "axios";
import StudentList from "./StudentList";
import { Navigate } from "react-router-dom";

function LogIn({
  username,
  password,
  students,
  setUser,
  setStudent,
  setUserName,
  setPassword,
}) {
  const [submited, setSubmited] = useState(false);

  const handleLogin = async (ev) => {
    ev.preventDefault();
    const username = ev.target[0].value;
    setUserName(username);
    try {
      const response = await axios.post(`http://localhost:5000/users/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setUser(data);
        setSubmited(true);
      }
    } catch (error) {}
  };

  useEffect(() => {}, [this.props.user]);

  return (
    <>
      {
        !submited ? (
          <div className="loginBox">
            {" "}
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button type="submit">submit</button>
            </form>
          </div>
        ) : (
          <Navigate to="/students" replace={true} state={{ user: this.props.user }} />
        )
        // (
        //   <StudentList students={students} setStudent={setStudent}  studentId={username}/>
        // )
      }
    </>
  );
}

export default LogIn;
