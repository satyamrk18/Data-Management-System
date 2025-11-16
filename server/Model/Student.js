import { model, Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    father_name: { type: String, required: true },
    mother_name: { type: String, required: true },
    address: { type: String, required: true },
    rollNo: { type: Number, required: true,unique: true },
    year_of_study: { type: String, required: true,enum:["First year","Second year","Third year","BE"] },
    branch: { type: String, required: true},
    aadhaNo: { type: Number, required: true },
    year:{type:Number,required: true  },
    college_ID:{type:String,unique:true},
    slug: {type : String, unique:true}
  },
  { timestamps: true }
);
const Student = model("Student", studentSchema);
export default Student;
