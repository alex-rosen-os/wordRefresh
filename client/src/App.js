/* eslint-disable array-callback-return */
import { useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";

function MyWords() {
  const [words, setWords] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handlePost = async (event) => {
    try {
      // const studentId = "0";
      const response = await axios.post(
        `http://localhost:5000/students/hi`, //${studentId}`
        {
          words: [],
        }
      );
      console.log("data", response.data);
      setWords(response.data);
    } catch (error) {
      console.log("1", error);
    }
    console.log("handling posts");
  };

  const handleInput = () => {
    // if (event.target.value === "noun") {
    //   console.log("this is a noun");
    // } else {
    //   console.log("this is a verb");
    // }
  };

  const fetchData = async (event) => {
    // console.log(event.target.previousElementSibling.previousElementSibling.value);
    let wordType =
      event.target.previousElementSibling.previousElementSibling.value;

    setValue(wordType);

    if (wordType === "noun") {
      console.log("this is a noun");
    } else {
      console.log("this is a verb");
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/words/teacherwords/${wordType}`
      );
      setWords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wordBox">
      <form onSubmit={handleSubmit}>
        <h2>Word Refresh</h2>
        <input type="text" onChange={handleInput} list="getWords"></input>
        <datalist id="getWords">
          <option value="verb" />
          <option value="noun" />
        </datalist>
        <button onClick={fetchData}>Get </button>
        {/* <div className="words">{words}</div> */}
      </form>
      <tbody>
        <tr>
          <th>word type</th>
          <th>word</th>
          <th>checkbox</th>
        </tr>
        {words.map((word, index) => (
          <tr>
            <td key={index + new Date().getTime()}> {value} </td>
            <td key={index * new Date().getTime()}> {word} </td>
            <td>
              <input type="checkbox"></input>
            </td>
          </tr>
        ))}
      </tbody>
      <div className="divButton">
        <button className={"postButton"} onClick={handlePost}>
          post
        </button>
      </div>
    </div>
  );
}

function LogIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();
  // const [students, setStudents] = useState([]);

  const handleLogin = async (ev) => {
    ev.preventDefault();
    const username = ev.target[0].value;
    setUserName(username);
    try {
      const response = await axios.post(`/login`, { username, password });
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        // history.push("/protected");

        console.log("data: ", data);
      } else {
      }
    } catch (error) {}
  };

  // const handleWords = async (event) => {
  //   event.preventDefault();
  //   let username = event.target[0].value;
  //   console.log("username", username);
  //   setUserName(username);

  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/users/teachers?firstname=${username}`
  //       // `http://localhost:5000/users/students/all`
  //     );
  //     setUserName(response.data.username);
  //     console.log("teacher app", response.data);
  //     // const fetchData = async () => {
  //     const myStudents = await axios.get(
  //       `http://localhost:5000/users/students/${response.data.studentId}`
  //     );
  //     console.log("got students ", myStudents.data);
  //     // return response.data
  //     // }
  //     // if (username === 'leo') {
  //     // let myStudents = fetchData()
  //     setStudents(myStudents.data);

  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {}, [username, students]);

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

      {/* {username && <p>i am {username}</p>}
      {students.length > 0 && (
        <p>
          these are my students:{" "}
          {students.map((student) => student.username).toString()}
        </p>
      )} */}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <LogIn />

      <MyWords />
    </div>
  );
}
