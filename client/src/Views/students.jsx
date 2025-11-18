import axios from "axios";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  // search student function
  const searchStudent = async () => {
    if (!searchText.trim()) {
      alert("Please enter a valid name");
      loadStudents();
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/search?q=${searchText}`
      );

      if (res.data.data.length === 0) {
        alert("Student not found");
        setSearchResults([]);
        return;
      }

      setSearchResults(res.data.data);
    } catch (err) {
      alert("student not found");
    }
  };

  return (
  <div className="p-6">
    <Navbar />

    {/* search students here */}
    <div className="w-full flex flex-row items-center justify-evenly mb-6">
      <input
        type="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Enter Student name"
        className="border rounded-lg p-0.5 w-2xl"
      />
      <button
        className="bg-blue-400 p-1 text-white rounded-xl font-semibold cursor-pointer hover:text-black"
        onClick={searchStudent}
      >
        Search
      </button>
    </div>

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
              Aadhar No.
            </th>
          </tr>
        </thead>

        {/* FIXED TERNARY OPERATOR */}
        {searchText === "" || searchResults.length === 0 ? (
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
        ) : (
          <tbody>
            {searchResults.map((s) => (
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
        )}
      </table>
    </div>
  </div>
);

};

export default Students;
