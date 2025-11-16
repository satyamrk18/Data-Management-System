import {BrowserRouter, Routes, Route} from "react-router"
import Home from "./Views/Home.jsx"
import StaffLogIN from "./Views/staffLogin.jsx"
import AllStudents from "./Views/students.jsx"
import PerticularStudent from "./Views/perticularStudent.jsx"
import EditStudent from "./Views/editStudent.jsx"
import AddStudent from "./Views/AddStudent.jsx"
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/stafflogin" element={<StaffLogIN />}></Route>
        <Route path="/students" element={<AllStudents />}></Route>
        <Route path="/student/:slug" element={<PerticularStudent />}></Route>
        <Route path="/student/edit/:slug" element={<EditStudent />}></Route>
        <Route path="/addstudent" element={<AddStudent />}></Route>
      </Routes>
      </BrowserRouter>
    </div>      
  )
}

export default App
