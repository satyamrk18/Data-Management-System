import Footer from "./../components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const EditStudent = () => {
  const [data, setData] = useState({
    name: "",
    father_name: "",
    mother_name: "",
    address: "",
    rollNo: "",
    year_of_study: "",
    year: "",
    branch: "",
    aadhaNo: "",
  });
  const { slug } = useParams();
  //get student data from slug
  const loadStudent = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/student/${slug}`
    );
    setData(response.data.data);
  };
  //load the student data
  useEffect(() => {
    loadStudent();
  }, []);
  //update student data
  const UpdateStudent = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/student/edit/${slug}`,data
    );
    if (response) {
      alert(response.data.message);
      window.location.href = `/student/${slug}`;
    } else {
      alert("something went wrong, please try again letter !");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-blue-700">Add Student</h1>

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-8">
        <form className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            />
          </div>

          {/* Parents */}
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Father Name</label>
              <input
                type="text"
                placeholder="Enter your father's name"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
                value={data.father_name}
                onChange={(e) => {
                  setData({ ...data, father_name: e.target.value });
                }}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Mother Name</label>
              <input
                type="text"
                placeholder="Enter your mother's name"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
                value={data.mother_name}
                onChange={(e) => {
                  setData({ ...data, mother_name: e.target.value });
                }}
              />
            </div>
          </div>

          {/* Academics */}
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Roll No.</label>
              <input
                type="number"
                placeholder="Roll No"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
                value={data.rollNo}
                onChange={(e) => {
                  setData({ ...data, rollNo: e.target.value });
                }}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Year of Study</label>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
                value={data.year_of_study}
                onChange={(e) => {
                  setData({ ...data, year_of_study: e.target.value });
                }}
              >
                <option value="">Select</option>
                <option>First year</option>
                <option>Second year</option>
                <option>Third year</option>
                <option>BE</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Branch</label>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
                value={data.branch}
                onChange={(e) => {
                  setData({ ...data, branch: e.target.value });
                }}
              >
                <option value="">Select</option>

                <option>Information Technology</option>
                <option>Computer Engineering</option>
                <option>Mechanical Engineering</option>
                <option>Electrical Engineering</option>
                <option>Electronics And Computer</option>
              </select>
            </div>
          </div>

          {/* Aadhaar + Admission Year */}
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Aadhaar No.</label>
              <input
                type="number"
                placeholder="Enter Aadhaar no."
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
                value={data.aadhaNo}
                onChange={(e) => {
                  setData({ ...data, aadhaNo: e.target.value });
                }}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Admission Year</label>
              <input
                type="number"
                placeholder="YYYY"
                min="2000"
                max="2099"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
                value={data.year}
                onChange={(e) => {
                  setData({ ...data, year: e.target.value });
                }}
              />
            </div>
          </div>

          {/* Personal */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
              value={data.address}
              onChange={(e) => {
                setData({ ...data, address: e.target.value });
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition"
            onClick={() => {
              UpdateStudent();
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default EditStudent;
