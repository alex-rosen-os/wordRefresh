import MyWords from "./MyWords";
import StudentList from "./StudentList";

function TeacherPage({ data }) {
console.log("@", data);

  return (
    <>
      <div>teacherPage</div>
      <StudentList 
      data={data} 
        />
      <MyWords students={data.students} />
    </>
  );
}
export default TeacherPage;
