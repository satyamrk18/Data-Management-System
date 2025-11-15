import axios from "axios";
import { useState, useEffect } from "react";
const students = () => {
  const [students, setStudents] = useState([]);

  //load the student data
  const loadStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/students`
      );
      if (response) {
        setStudents(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert(err.response);
    }
  };
//load the students
useEffect(()=>{loadStudents()},[]);
return(
    <div>
        <h1>All Students</h1>
        {
            students.map((studentObj)=>
            {
                const {name,father_name,mother_name,address,rollNo,year_of_study,aadhaNo,year,college_ID,slug} = studentObj;
                return <div key={college_ID}>{name}</div>
            })
        }
    </div>
)

};
export default students;
