import { useEffect } from "react";
import axios from "axios";

function StudentList({user, setStudents, students}) {
  useEffect(() => {
      if (user && !students.length) {
        const handleStudentList = async () => {
          if (user?.id) {
            const response = await axios.get(
              `http://localhost:5000/users/students/${user}`
            );
            console.log("students", response.data);
           setStudents(response.data);
          } 
        };
        handleStudentList();
      }
    },
    [user]
  );

  return (
    <div className="studentList">
      student list :
      <div className={"students"}>
        {Array.isArray(students) && students.length > 0 ? (
          students.map((student) => (
            <div key={student.id}>
              <input type={"checkbox"} />
              {student.username}
            </div>
          ))
        ) : (
          <p>no students found</p>
        )}
      </div>
      <button type="submit">submit</button>
    </div>
  );
}

export default StudentList;
