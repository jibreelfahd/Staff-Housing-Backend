import Staff from "../../models/staff/staff.js";
import ApplicationRequest from "../../models/application-request/application-request.js";
import { BadRequestError } from "../../errors/index.js";
import { NotFoundError } from "../../errors/index.js";
import { StatusCodes } from "http-status-codes";

export const signUp = async (req, res) => {
  const { name, email, position, department, password, dateOfEmployment } =
    req.body;

  if (!name || !email || !position || !password || !dateOfEmployment) {
    throw new BadRequestError("Sorry, error in input fields.");
  }

  const staff = await Staff.create({
    name,
    email,
    position,
    department,
    password,
    dateOfEmployment,
  });

  return res.status(StatusCodes.OK).json({ staff });
};

export const applicationRequest = async (req, res) => {
  const { staffID, area, name, department } = req.body;

  const checkStaff = await Staff.findOne({ staffID, name, department });

  if (!checkStaff) {
    throw new NotFoundError(
      "Staff does not exist, Enter a valid ID, name, department"
    );
  }

  const application = await ApplicationRequest.create({
    staff: checkStaff._id,
    area,
    applicationType: "allocation",
    applicationStatus: "pending",
  });

  return res.status(StatusCodes.OK).json({ application });
};

export const maintenanceRequest = async (req, res) => {
  const { staffID, area, roomNumber, complaint } = req.body;

  if (!staffID || !area || !roomNumber || !complaint) {
    throw new BadRequestError(
      "Staff ID, area, room number and compaint must be provided"
    );
  }

  const checkStaff = await Staff.findOne({ staffID });

  if (!checkStaff) {
    throw new NotFoundError("Staff does not exist, input a valid Staff ID");
  }

  
  return res.status(StatusCodes.OK).json({});
};

export const retirementRequest = async (req, res) => {
  const { staffID, name, department, area, roomNumber } = req.body;

  if (!staffID || !area || !roomNumber || !name || !department) {
    throw new BadRequestError(
      "Staff ID, area, room number and compaint must be provided"
    );
  }

  const checkStaff = await Staff.findOne({ staffID, name, department });

  if (!checkStaff) {
    throw new NotFoundError("Staff does not exist, enter a valid Staff ID");
  }

  res.status(StatusCodes.OK).json({});
};
