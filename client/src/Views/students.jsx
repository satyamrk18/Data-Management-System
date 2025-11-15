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
  useEffect(() => {
    loadStudents();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Students</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Roll No
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Year of Study
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Academic Year
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                College ID
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Addhar No.
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((studentObj) => {
              const {
                name,
                father_name,
                mother_name,
                address,
                rollNo,
                year_of_study,
                aadhaNo,
                year,
                college_ID,
                slug,
              } = studentObj;

              return (
                <tr key={college_ID} className="border-t">
                  <td className="px-4 py-3 text-sm">{rollNo}</td>
                  <td className="px-4 py-3 text-sm">{name}</td>
                  <td className="px-4 py-3 text-sm">{year_of_study}</td>
                  <td className="px-4 py-3 text-sm">{year}</td>
                  <td className="px-4 py-3 text-sm">{college_ID}</td>
                  <td className="px-4 py-3 text-sm">{aadhaNo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default students;
