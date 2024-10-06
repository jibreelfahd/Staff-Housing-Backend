import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new Schema(
  {
    adminID: {
      type: String,
      required: [true, "Provide a unique admin ID"],
      unqiue: true
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Admin proivded password is required"],
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

//HASHING THE PASSWORD
adminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = model("Admin", adminSchema);
export default Admin;
