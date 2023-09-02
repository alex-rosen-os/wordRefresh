/* eslint-disable array-callback-return */
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import MyWords from "./components/MyWords.js";
import LogIn from "./components/LogIn.js";
import StudentList from "./components/StudentList.js";

export default function App() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({});
  const [id, setId] = useState("");
  const [studentId, setStudentId] = useState([]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LogIn
              username={username}
              password={password}
              id={id}
              students={students}
              setUserName={setUserName}
              setPassword={setPassword}
              setId={setId}
              setUser={setUser}
             user={user}
            />
          }
        />
        <Route
          path="/students"
          element={
            <StudentList
              id={id}
              students={students}
              user={user}
              username={username}
              setStudents={setStudents}
              studentId={studentId}
              setStudentId = {setStudentId}
            />
          }
        />
        <Route path="/words" element={<MyWords />} />
      </Routes>
    </div>
  );
}
