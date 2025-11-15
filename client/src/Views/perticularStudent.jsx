import axios from "axios";
import Footer from "./../components/Footer.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/backbutton.jsx";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <BackButton goTo="/students" />
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6 border">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 border-b pb-2">
          Student Details
        </h2>

        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium text-gray-500 text-sm">Name</p>
            <p className="text-base">{student?.name}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500 text-sm">Father's Name</p>
            <p className="text-base">{student?.father_name}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500 text-sm">Mother's Name</p>
            <p className="text-base">{student?.mother_name}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500 text-sm">Address</p>
            <p className="text-base">{student?.address}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500 text-sm">Roll No</p>
            <p className="text-base">{student?.rollNo}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500 text-sm">Year of Study</p>
            <p className="text-base">{student?.year_of_study}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500 text-sm">Branch</p>
            <p className="text-base">{student?.branch}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500 text-sm">Aadhar No</p>
            <p className="text-base">{student?.aadhaNo}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500 text-sm">Year</p>
            <p className="text-base">{student?.year}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500 text-sm">College ID</p>
            <p className="text-base">{student?.college_ID}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-10 mt-10">
        <Link to={`/student/edit/${slug}`} className="p-0.5 w-[85px] flex items-center justify-center rounded-lg font-semibold bg-green-600 text-white cursor-pointer hover:bg-green-500 hover:text-black">
          Edit
        </Link>
        <Link className="p-0.5 w-[85px] rounded-lg font-semibold flex items-center justify-center bg-red-600 text-white cursor-pointer hover:bg-red-500 hover:text-black">
          Delete
        </Link>
       
      </div>
      <Footer />
    </div>
  );
};
export default perticularStudent;
