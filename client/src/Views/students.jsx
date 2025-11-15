import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const loadStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/students`
      );
      if (response) setStudents(response.data.data);
      else alert(response.data.message);
    } catch (err) {
      alert(err.response);
    }
  };

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
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Roll No</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Year of Study</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Academic Year</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">College ID</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Aadhar No.</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s.college_ID}
                className="border-t cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/student/${s.slug}`)}
              >
                <td className="px-4 py-3 text-sm">{s.rollNo}</td>
                <td className="px-4 py-3 text-sm">{s.name}</td>
                <td className="px-4 py-3 text-sm">{s.year_of_study}</td>
                <td className="px-4 py-3 text-sm">{s.year}</td>
                <td className="px-4 py-3 text-sm">{s.college_ID}</td>
                <td className="px-4 py-3 text-sm">{s.aadhaNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
