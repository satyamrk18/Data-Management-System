import poster from "./../assets/college_poster.png";
import Footer from "./../components/Footer.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const staffLogIn = () => {
  const [staffData, setstaffData] = useState({
    email: "" || "",
    password: "" || "",
  });

  //log in
  const login = async () => {
    if (!staffData.email || !staffData.password) {
      return alert("All feilds are required");
    }
    console.log("called");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stafflogin`,
        staffData
      );
      if (response.data.success) {
        setstaffData({ email: "", password: "" });
        localStorage.setItem("staff", response.data.data.email);
        localStorage.setItem(
          "staffjwtauthenticationToken",
          response.data.token
        );
        // set default Authorization header for future axios requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        window.location.href = "/students";
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-between flex-col gap-10 ">
      <img src={poster} className="w-full h-[30vh]" />
      <div className="flex flex-row items-center justify-evenly w-full gap-5 flex-wrap">
        <div className="border p-5 rounded-2xl">
          <p className="text-xl font-medium">सूचना</p>
          <ol className="list-decimal list-inside leading-8">
            <li>कॉलेजकडून दिलेला ईमेल (Email) टाइप करा.</li>
            <li>
              पासवर्ड (Password) जसे तुम्हाला दिलेले आहे तसेच टाइप करा. "Login"
              बटणावर क्लिक करा.
            </li>
            <li>"Login" बटणावर क्लिक करा.</li>
            <li>
              लॉगिन यशस्वी झाल्यानंतर तुमची विद्यार्थी माहिती आपोआप दाखवली जाईल.
            </li>
            <li>
              जर लॉगिन होत नसेल, तर कृपया प्रशासकाशी (Administrator) संपर्क
              साधा.
            </li>
            <li>
              लॉगिन झाल्यानंतर संबंधित विभागातील सर्व विद्यार्थी दाखवले जातील.
            </li>
            <li>
              प्रत्येक विद्यार्थ्याची माहिती पाहण्यासाठी यादीतील नावावर क्लिक
              करा.
            </li>
            <li>वापर पूर्ण झाल्यानंतर "Logout" बटणावर क्लिक करा.</li>
            <li>
              कृपया या लिंकवर क्लिक करा विद्यार्थी लॉगिनसाठी.{" "}
              <Link to="/" className="text-blue-500 underline">
                विद्यार्थी लॉगिन
              </Link>
            </li>
          </ol>
        </div>
        <div>
          <h1 className="text-center mb-5 text-xl font-medium">Staff log in</h1>
          <div className="flex flex-col items-center justify-center gap-5">
            <input
              type="text"
              placeholder="Enter your email"
              value={staffData.email || ""}
              onChange={(e) => {
                setstaffData({ ...staffData, email: e.target.value });
              }}
              className="border rounded-lg p-0.5 w-3xs"
              required
            />
            <input
              type="text"
              placeholder="Enter password"
              value={staffData.password || ""}
              onChange={(e) => {
                setstaffData({ ...staffData, password: e.target.value });
              }}
              required
              className="border rounded-lg p-0.5 w-3xs"
            />
            <button
              type="button"
              className="p-1 rounded-lg w-[100px] text-white bg-blue-400 cursor-pointer hover:text-black"
              onClick={() => {
                login();
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default staffLogIn;
