import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-white shadow-md mb-6">
      <h1 className="text-2xl font-semibold mb-4">All Students</h1>
      <Link
        to="/addstudent"
        className="bg-green-500 p-1 rounded-xl text-white font-semibold cursor-pointer"
      >
        Add Student
      </Link>
      <p>Class Teacher: {localStorage.getItem("staff")}</p>
      <button
        className="bg-red-500 p-1 rounded-xl text-white font-semibold cursor-pointer"
        onClick={() => {
          localStorage.removeItem("staff");
          window.location.href = "/stafflogin";
        }}
      >
        Logout
      </button>
    </div>
  );
};
export default Navbar;
