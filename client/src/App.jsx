import {BrowserRouter, Routes, Route} from "react-router"
import Home from "./Views/Home.jsx"
import StaffLogIN from "./Views/staffLogin.jsx"
import AllStudents from "./Views/students.jsx"
import PerticularStudent from "./Views/perticularStudent.jsx"
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/stafflogin" element={<StaffLogIN />}></Route>
        <Route path="/students" element={<AllStudents />}></Route>
        <Route path="/student/:slug" element={<PerticularStudent />}></Route>
      </Routes>
      </BrowserRouter>
    </div>      
  )
}

export default App
