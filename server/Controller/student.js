import PDFDocument from "pdfkit";
import fs from "fs";
import Student from "./../Model/Student.js";
//add student
const poststudent = async (req, res) => {
  try {
    const {
      name,
      father_name,
      mother_name,
      address,
      rollNo,
      year_of_study,
      branch,
      aadhaNo,
      year,
    } = req.body;

    if (
      !name ||
      !father_name ||
      !mother_name ||
      !address ||
      !rollNo ||
      !year_of_study ||
      !branch ||
      !aadhaNo ||
      !year
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    } else {
      const word = branch.split(" ");
      const branch_ID = (word[0][0] + word[1][0]).toUpperCase();
      const uniqueNo = `${year}${branch_ID}${aadhaNo
        .toString()
        .substring(0, 4)}-${rollNo}`.trim();

      //college unique ID generation
      const college_ID = `${
        year_of_study == "First year"
          ? `F${uniqueNo}`
          : year_of_study == "Second year"
          ? `S${uniqueNo}`
          : year_of_study == "Third year"
          ? `T${uniqueNo}`
          : year_of_study == "BE"
          ? `B${uniqueNo}`
          : ""
      }`;
      //slug generation
      const slug = `${name.toLowerCase().replace(/\s+/g, "-")}-${uniqueNo}`;
      const studentData = new Student({
        name,
        father_name,
        mother_name,
        address,
        rollNo,
        year_of_study,
        branch,
        aadhaNo,
        year,

        college_ID,
        slug,
      });
      const saveStudet = await studentData.save();
      res.json({
        success: true,
        data: saveStudet,
        message: "student added successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//get all students
const getStudent = async (req, res) => {
  const response = await Student.find();
  if (response) {
    res.status(200).json({
      success: true,
      data: response,
      message: "all student find successfully",
    });
  } else {
    res.json({
      success: false,
      message: "data not found",
    });
  }
};
//get perticuar student by its sug
const getPerticularStudent = async (req, res) => {
  const { slug } = req.params;
  const student = await Student.findOne({ slug });
  if (student) {
    res.status(200).json({
      success: true,
      data: student,
      message: "perticukar student find successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "student not found",
    });
  }
};
//update student details
const putUpdateStudent = async (req, res) => {
  const { slug } = req.params;
  try {
    const {
      name,
      father_name,
      mother_name,
      address,
      rollNo,
      year_of_study,
      branch,
      aadhaNo,
      year,
    } = req.body;
    const EditStudent = await Student.findOneAndUpdate(
      { slug: slug },
      {
        name,
        father_name,
        mother_name,
        address,
        rollNo,
        year_of_study,
        branch,
        aadhaNo,
        year,
      },
      { new: true }
    );
    if (EditStudent) {
      const word = branch.split(" ");
      const branch_ID = (word[0][0] + word[1][0]).toUpperCase();
      const uniqueNo = `${year}${branch_ID}${aadhaNo
        .toString()
        .substring(0, 4)}-${rollNo}`.trim();

      //college unique ID generation
      EditStudent.college_ID = `${
        year_of_study == "First year"
          ? `F${uniqueNo}`
          : year_of_study == "Second year"
          ? `S${uniqueNo}`
          : year_of_study == "Third year"
          ? `T${uniqueNo}`
          : year_of_study == "BE"
          ? `B${uniqueNo}`
          : ""
      }`;
      //slug generation
      EditStudent.slug = `${name
        .toLowerCase()
        .replace(/\s+/g, "-")}-${uniqueNo}`;
      await EditStudent.save();
      res.json({
        success: true,
        data: EditStudent,
        message: "student update successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "student not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
//student log in by college id and mother name and making pdf
const postStudentLogin = async (req, res) => {
  const { college_ID, mother_name } = req.body;
  const studentData = await Student.findOne({
    college_ID: college_ID,
    mother_name: mother_name,
  });
  if (studentData) {
    //making the pdf of student data
    const doc = new PDFDocument();
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${studentData.name}.pdf"`
    );
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);
    doc.fontSize(20).text("Student Information", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${studentData.name}`);
    doc.text(`Father Name: ${studentData.father_name}`);
    doc.text(`Mother Name: ${studentData.mother_name}`);
    doc.text(`Roll No: ${studentData.rollNo}`);
    doc.text(`Branch: ${studentData.branch}`);
    doc.text(`Addhar No:: ${studentData.aadhaNo}`);
    doc.text(`Year of study: ${studentData.year_of_study}`);
    doc.text(`Address : ${studentData.address}`);
    doc.text(`Year: ${studentData.year}`);
    doc.end();
  } else {
    res.status(404).json({
      success: false,
      message: "user not found please try again later !",
    });
  }
};
export {
  poststudent,
  getStudent,
  getPerticularStudent,
  putUpdateStudent,
  postStudentLogin,
};
