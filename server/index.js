import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {poststudent,getStudent,getPerticularStudent,putUpdateStudent,postStudentLogin} from "./Controller/student.js";
import {postStaff,staffLogIn} from "./Controller/staff.js"
//all midleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//momgo DB connection

const conn = async () => {
  const connection = await mongoose.connect(
    `${process.env.MONGO_URL}`
  );
  if (connection) {
    console.log("Database connect successfully");
  } else {
    console.log("error while connecting to server");
  }
};

//server health checking
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "server is healthy",
  });
});

//STUDENT
app.post("/addstudent",poststudent);
//get all students
app.get("/students",getStudent);
//find perticular
app.get("/student/:slug",getPerticularStudent);
//update student details
app.put("/student/:slug",putUpdateStudent);
//student log in
app.post("/studentlogin",postStudentLogin);

//STAFF 
app.post("/addStaff",postStaff);
//check email and password for staff log in
app.post("/stafflogin",staffLogIn);

app.listen(8080, () => {
  console.log("server is running");
  conn();
});
