import { json, response } from "express";
import Student from "./../Model/Student.js";
//add student
const poststudent = async (req, res) => {
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
    message: "model works successfully",
  });
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
  const {
    name,
    father_name,
    mother_name,
    address,
    rollNo,
    year_of_study,
    branch,
    aadhaNo,
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
    EditStudent.slug = `${name.toLowerCase().replace(/\s+/g, "-")}-${uniqueNo}`;
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
};
//student log in by college id and mother name
const postStudentLogin = async (req,res) =>
{
  const {college_ID, mother_name} = req.body;
  const studentData = await Student.findOne({college_ID:college_ID, mother_name:mother_name});
  if(studentData)
  {
    res.status(200).json({
      success:true,
      data:studentData,
      message:"student find successfully !"
    })
  }
  else{
    res.status(404).json({
      success:false,
      message:"user not found please try again later !"
    })
  }
}
export { poststudent, getStudent, getPerticularStudent, putUpdateStudent,postStudentLogin };
