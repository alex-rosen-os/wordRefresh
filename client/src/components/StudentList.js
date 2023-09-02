import { useEffect } from "react";
import axios from "axios";

function StudentList(props) {
  useEffect(
    (props) => {
      console.log("use effect", props, );
      if (props.user && !props.students.length) {
        const handleStudentList = async () => {
          if (props.user?.id) {
            console.log("props", props);
            const response = await axios.get(
              `http://localhost:5000/users/students/${props.studentId}`
            );
            console.log("students", response.data);
            props.setStudents(response.data);
          }
        };
        handleStudentList();
      }
    },
    [props.user, props.students, props.setStudents]
  );

  return (
    <div className="studentList">
      student list :
      <div className={"students"}>
        {Array.isArray(props.students) && props.students.length > 0 ? (
          props.students.map((student) => (
            <div key={student.id}>
              <input type={"checkbox"} />
              {student.username}
            </div>
          ))
        ) : (
          <p>no students found</p>
        )}
      </div>
    </div>
  );
}

export default StudentList;
