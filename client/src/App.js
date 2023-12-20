/* eslint-disable array-callback-return */
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import MyWords from "./components/MyWords.js";
import LogIn from "./components/LogIn.js";
import StudentList from "./components/StudentList.js";
import TeacherPage from "./components/TeacherPage.js";

export default function App() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [id, setId] = useState("");
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
              setUserName={setUserName}
              setPassword={setPassword}
              setId={setId}
              setData={setData}
              data={data}
            />
          }
        />
        <Route path="/students" element={<StudentList data={data} />} />
        <Route
          path="/teacherPage"
          element={<TeacherPage data={data}></TeacherPage>}
        />
        <Route path="/words" element={<MyWords />} />
      </Routes>
    </div>
  );
}
