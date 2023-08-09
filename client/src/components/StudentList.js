// import { useState } from "react";
// import axios from "axios";

// function StudentList() {
//   const [teacherId, setTeacherId] = useState([]);
//   const [username, setUsername] = useState([]);

//   const handleStudentList = async () => {
//     const response = await axios.get(
//       `http://localhost:5000/users/students/${teacherId}`
//     );
//     return setTeacherId(response);

//     const username = ev.target[0].value;
//     setUsername(username);
//   };

//   // useEffect(()=> {

//   // },[])

//   return (
//     <div>
//       student list :{" "}
//       {teacherId.map((teacher) => {
//         teacher.username;
//       })}{" "}
//     </div>
//   );
// }

// export default StudentList;
