import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {poststudent,getStudent,getPerticularStudent,putUpdateStudent} from "./Controller/student.js";
//all midleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//momgo DB connection

const conn = async () => {
  const connection = await mongoose.connect(
    "mongodb+srv://Satyamrk18:raosaheb@personalclusters.hmlbavl.mongodb.net/student"
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
app.put("/student/:slug",putUpdateStudent)

app.listen(8080, () => {
  console.log("server is running");
  conn();
});
