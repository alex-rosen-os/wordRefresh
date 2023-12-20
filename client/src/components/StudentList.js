import { useEffect } from "react";
import axios from "axios";

function StudentList({data}) {
  useEffect(() => {
    // console.log("1", data.id)
    // console.log("2", data.students)

    },
    [data]
  );

  return (
    <div className="studentList">
      student list :
      <div className={"students"}>
        {
        Array.isArray(data.students) && 
        data.students.length > 0 ? (
          data.students.map((student) => (
            <div key={student.id}>
              <input type={"checkbox"} />
              {student.username}
            </div>
          ))
        ) : (
          <p>no students found</p>
        )
        }
      </div>

      <button type="submit">submit</button>
    </div>
  );
}

export default StudentList;
