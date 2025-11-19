import axios from "axios";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false); // New state to track if a search was attempted
  const navigate = useNavigate();

  //  Function to load all students
  const loadStudents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/students`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "staffjwtauthenticationToken"
            )}`,
          },
        }
      );
      setStudents(response.data.data);
      setSearchResults([]);
      setIsSearched(false);
    } catch (err) {
      alert("you are not authorized person" || "Failed to load students");
    }
  };

  //  Load all students when the component mounts
  useEffect(() => {
    loadStudents();
  }, []); 

  // Search student function
  const searchStudent = async () => {
    setSearchResults([]);
    setIsSearched(true);

    if (!searchText.trim()) {
      alert("Please enter a valid name");
      // If search text is empty, display all students again
      loadStudents();
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/search?q=${searchText}`
      );

      if (res.data.data.length === 0) {
        // Student not found alert is now triggered here
        alert("Student not found");
        return;
      }

      setSearchResults(res.data.data);
    } catch (err) {
      // Catch potential API errors, not just "not found"
      alert("An error occurred during search.");
    }
  };

  // 4. Function to handle input change and reset view
  const handleSearchTextChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    // If the search box is cleared, reset the view to display all students
    if (text === "") {
      setIsSearched(false);
    }
  };

  // Determine which list to display
  const displayList =
    isSearched && searchResults.length > 0 ? searchResults : students;

  // Determine if we should show the "Student not found" alert based on the state
  const shouldShowNotFoundAlert = isSearched && searchResults.length === 0;

  return (
    <div className="p-6">
      <Navbar />

      {/* search students here */}
      <div className="w-full flex flex-row items-center justify-evenly mb-6">
        <input
          type="search"
          value={searchText}
          onChange={handleSearchTextChange} // Use the new handler
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

          <tbody>
            {displayList.map((s) => (
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

        {/* Display "Student not found" message */}
        {shouldShowNotFoundAlert && (
          <div className="p-4 text-center text-red-500 font-semibold">
            Student not found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
