import { useEffect, useState } from "react";
import axios from "axios";
import StudentList from "./StudentList";

function LogIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [students, setStudents] = useState([]);
  const [teacerId, setTeacherId] = useState(" ");

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
        console.log(data, "data");
        localStorage.setItem("token", data.token);
        const teacherId = '5'
        const myStudents = await axios.get(
          `http://localhost:5000/users/students/${teacherId}`
        );
        // console.log("got students ", myStudents.data);
        console.log("this are my students: ", myStudents);
      } else {
      }
    } catch (error) {}
  };

  const handleWords = async (event) => {
    event.preventDefault();
    let username = event.target[0].value;
    console.log("username", username);
    setUserName(username);

    try {
      const response = await axios.get(
        `http://localhost:5000/users/teachers?firstname=${username}`
        // `http://localhost:5000/users/students/all`
      );
      setUserName(response.data.username);
      console.log("teacher app", response.data);
      // const fetchData = async () => {
      const myStudents = await axios.get(
        `http://localhost:5000/users/students/${response.data.studentId}`
      );
      console.log("got students ", myStudents.data);
      // return response.data
      // }
      // if (username === 'leo') {
      // let myStudents = fetchData()
      setStudents(myStudents.data);

      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [username, students]);

  return (
    <div className="loginBox">
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
        <input type="submit" placeholder="submit" />
      </form>
      {username && <p>i am {username}</p>}

      <div>
        {/* {handleWords}
        {students.length > 0 &&  */}
          <p>
            these are my students:
            {students.map((student) => student.students).toString()}
          
          
            
          </p>
        {/* } */}

      </div>
      {/* <StudentList /> */}

    </div>
  );
}

export default LogIn;
