import { model, Schema } from "mongoose";

const staffSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true,}
);
const Staff = model("Staff",staffSchema);
export default Staff;