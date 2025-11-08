import { model, Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: { type: String, require: true },
    father_name: { type: String, require: true },
    mother_name: { type: String, require: true },
    address: { type: String, require: true },
    rollNo: { type: Number, require: true },
    year_of_study: { type: String, require: true,enum:["First year","Second year","Third year","BE"] },
    branch: { type: String, require: true},
    aadhaNo: { type: Number, require: true },
    year:{type:Number,require: true  },
    college_ID:{type:String,unique:true},
    slug: {type : String, unique:true}
  },
  { timestamps: true }
);
const Student = model("Student", studentSchema);
export default Student;
