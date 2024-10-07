import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";
import validator from "validator";
import bcrypt from "bcryptjs";

const { isEmail } = validator;

const staffSchema = new Schema(
  {
    staffID: {
      type: String,
      default: () => nanoid(6),
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please proivde user name"],
    },
    email: {
      type: String,
      validate: [isEmail, "Enter a valid email"],
      required: [true, "Email is required"],
      unique: true,
    },
    position: {
      type: String,
      required: [true, "User position is required"],
    },
    department: {
      type: String,
      required: [true, "User Department cannot be empty"],
    },
    password: {
      type: String,
      required: [true, "Enter Password 1-7 characters"],
      minlength: [8, 'Password length must exceed 8 characters'],
    },
    dateOfEmployment: {
      type: String,
      required: [true, "Date of employment must be provided"],
    },
    applicationRequests: [{
      type: Schema.Types.ObjectId,
      ref: 'Applications'
    }],
    maintenancRequests: [{
      type: Schema.Types.ObjectId,
      ref: 'Maintenance'
    }],
    retirementRequests: [{
      type: Schema.Types.ObjectId,
      ref: 'Retirement'
    }],
    createdAt: {
      type: Date,
      default: Date.now()
    }
  });

//HASHING THE PASSWORD
staffSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Staff = model("Staff", staffSchema);
export default Staff;
