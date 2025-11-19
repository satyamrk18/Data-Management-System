import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  poststudent,
  getStudent,
  getPerticularStudent,
  putUpdateStudent,
  postStudentLogin,
  deleteStudent,
  SearchStudentByName,
} from "./Controller/student.js";
import { postStaff, staffLogIn } from "./Controller/staff.js";
//all midleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//momgo DB connection

const conn = async () => {
  const connection = await mongoose.connect(`${process.env.MONGO_URL}`);
  if (connection) {
    console.log("Database connect successfully");
  } else {
    console.log("error while connecting to server");
  }
};

//jwt authentication middleware
const JWTcheck = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(402).json({
        success: false,
        message: "you are not authorized person",
      });
    }
    const token = authorization.split(" ")[1];
    const decoedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
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
app.post("/addstudent",JWTcheck, poststudent);

//get all students
app.get("/students",JWTcheck, getStudent);

//search student by name
app.get("/student/search",JWTcheck, SearchStudentByName);

//find perticular
app.get("/student/:slug",JWTcheck, getPerticularStudent);

//update student details
app.put("/student/edit/:slug",JWTcheck, putUpdateStudent);

//student log in
app.post("/studentlogin", postStudentLogin);

//delete student
app.delete("/student/delete/:slug",JWTcheck, deleteStudent);

//STAFF
app.post("/addStaff", postStaff);
//check email and password for staff log in
app.post("/stafflogin", staffLogIn);

app.listen(8080, () => {
  console.log("server is running");
  conn();
});
