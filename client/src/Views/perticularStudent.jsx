import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const perticularStudent = () => {
  const { slug } = useParams();
  const [student, setStudent] = useState(null);
  //geting the perticular student data
  const loadStudent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/${slug}`
      );
      if (response) {
        setStudent(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert(err.response);
    }
  };
//load the perticular student data
useEffect(() => {
    loadStudent();
  }, []);
  return (
    <div>
        {
            student?.name
        }
    </div>
    )
};
export default perticularStudent;
