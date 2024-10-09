import Staff from "../../models/staff/staff.js";
import Houses from "../../models/houses/houses.js";
import ApplicationRequest from "../../models/application-request/application-request.js";
import MaintenanceRequest from "../../models/maintenance-request/maintenance.js";
import RetirementRequest from "../../models/retirement-request/retirement.js";
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

  const existingApplication = await ApplicationRequest.findOne({
    staff: checkStaff._id,
  });

  if (existingApplication) {
    throw new BadRequestError(
      `Application request for staff ${checkStaff.name} already submitted`
    );
  }

  const newApplication = await ApplicationRequest.create({
    staff: checkStaff._id,
    area: area,
  });

  return res.status(StatusCodes.OK).json({ newApplication });
};

export const maintenanceRequest = async (req, res) => {
  const { staffID, area, houseNumber, complaints } = req.body;

  if (!staffID || !area || !houseNumber || !complaints) {
    throw new BadRequestError(
      "Staff ID, area, room number and compaint must be provided"
    );
  }

  const checkStaff = await Staff.findOne({ staffID });

  if (!checkStaff) {
    throw new NotFoundError("Staff does not exist, input a valid Staff ID");
  }

  const checkStaffHouseExist = await Houses.findOne({
    area,
    houses: {
      $elemMatch: {
        houseNumber: houseNumber,
        occupiedBy: checkStaff._id,
      },
    },
  });

  if (!checkStaffHouseExist) {
    throw new BadRequestError(
      "Invalid house credentials, house does not exist"
    );
  }

  const maintenaceApplication = await MaintenanceRequest.create({
    staff: checkStaff._id,
    houseSpecified: checkStaffHouseExist._id,
    complaints,
  });

  return res.status(StatusCodes.OK).json({ maintenaceApplication });
};

export const retirementRequest = async (req, res) => {
  const { staffID, name, department, area, houseNumber } = req.body;

  if (!staffID || !name || !houseNumber || !area || !department) {
    throw new BadRequestError(
      "Staff ID, area, room number and compaint must be provided"
    );
  }

  const checkStaff = await Staff.findOne({ staffID, name, department });

  if (!checkStaff) {
    throw new NotFoundError(
      "Staff does not exist, enter a valid Staff ID, name or department"
    );
  }

  const checkStaffHouseExist = await Houses.findOne({
    area,
    houses: {
      $elemMatch: {
        houseNumber: houseNumber,
        occupiedBy: checkStaff._id,
      },
    },
  });

  if (!checkStaffHouseExist) {
    throw new BadRequestError(
      "Invalid house credentials, house does not exist"
    );
  }

  const existingRetirementApplication = await RetirementRequest.findOne({ staff: checkStaff._id });

  if (existingRetirementApplication) {
    throw new BadRequestError(
      `Retirement request for staff ${checkStaff.name} already submitted`
    )
  }

  const newRetirementApplication = await RetirementRequest.create({
    staff: checkStaff._id,
    houseSpecified: checkStaffHouseExist._id,
  });

  res.status(StatusCodes.OK).json({ newRetirementApplication });
};
