import LoginForm from "../components/loginform";
import poster from "./../assets/college_poster.png";
const Home = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <img src={poster} className="w-full h-[30vh]" />
      <div className="flex flex-row items-center justify-evenly w-full gap-5 flex-wrap">
      <div className="border-1 p-5 rounded-2xl">
        <p className="text-xl font-medium">सूचना</p>
        <ol className="list-decimal list-inside leading-8">
          <li>कॉलेजकडून दिलेला आयडी (College ID) टाइप करा.</li>
          <li>
            आईचे पूर्ण नाव (Mother’s Full Name) जसे कॉलेजमध्ये नोंदलेले आहे तसेच
            टाइप करा.
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
            लॉगिन झाल्यानंतर तुमचे नाव, शाखा, वर्ष, रोल नंबर, व पत्ता स्क्रीनवर
            दिसेल.
          </li>
          <li>वापर पूर्ण झाल्यानंतर "Logout" बटणावर क्लिक करा.</li>
        </ol>
      </div>
      <div>
        <h1 className="text-center mb-5 text-xl font-medium">Student log in</h1>
      <LoginForm />
      </div>
      </div>
    </div>
  );
};
export default Home;
