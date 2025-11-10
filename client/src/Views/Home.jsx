import poster from "./../assets/college_poster.png";
import Footer from "./../components/Footer.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
const Home = () => {
  const [studentData, setStudentData] = useState({
    college_ID: "" || "",
    mother_name: "" || "",
  });
  const login = async () => {
    const response = await axios.post(
      `http://localhost:8080/studentlogin`,
      studentData
    );
    if (response) {
      setStudentData(response);
      const data = response.data.data;
      alert(JSON.stringify(data));
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-between flex-col gap-10 ">
      <img src={poster} className="w-full h-[30vh]" />
      <div className="flex flex-row items-center justify-evenly w-full gap-5 flex-wrap">
        <div className="border p-5 rounded-2xl">
          <p className="text-xl font-medium">सूचना</p>
          <ol className="list-decimal list-inside leading-8">
            <li>कॉलेजकडून दिलेला आयडी (College ID) टाइप करा.</li>
            <li>
              आईचे पूर्ण नाव (Mother's Full Name) जसे कॉलेजमध्ये नोंदलेले आहे
              तसेच टाइप करा.
            </li>
            <li>"Login" बटणावर क्लिक करा.</li>
            <li>
              लॉगिन यशस्वी झाल्यानंतर तुमची विद्यार्थी माहिती आपोआप दाखवली जाईल.
            </li>
            <li>
              जर लॉगिन होत नसेल, तर कृपया तुमच्या वर्गशिक्षकांशी (Class Teacher)
              संपर्क साधा.
            </li>
            <li>तुमचा कॉलेज आयडी आणि माहिती कोणाशीही शेअर करू नका.</li>
            <li>
              लॉगिन झाल्यानंतर तुमचे नाव, शाखा, वर्ष, रोल नंबर, व पत्ता
              स्क्रीनवर दिसेल.
            </li>
            <li>वापर पूर्ण झाल्यानंतर "Logout" बटणावर क्लिक करा.</li>
          </ol>
        </div>
        <div>
          <h1 className="text-center mb-5 text-xl font-medium">
            Student log in
          </h1>
          <div className="flex flex-col items-center justify-center gap-5">
            <input
              type="text"
              placeholder="Enter college ID"
              value={studentData.college_ID || ""}
              onChange={(e) => {
                setStudentData({ ...studentData, college_ID: e.target.value });
              }}
              className="border rounded-lg p-0.5 w-3xs"
              required
            />
            <input
              type="text"
              placeholder="Enter Mother Name"
              value={studentData.mother_name || ""}
              onChange={(e) => {
                setStudentData({ ...studentData, mother_name: e.target.value });
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
export default Home;
