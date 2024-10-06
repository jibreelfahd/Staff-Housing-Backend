import Staff from "../../models/staff/staff.js";
import Houses from '../../models/houses/houses.js';
import Admin from "../../models/admin/admin.js";
import ApplicationRequest from "../../models/application-request/application-request.js";
import MaintenanceRequest from "../../models/maintenance-request/maintenance.js";
import RetirementRequest from "../../models/retirement-request/retirement.js";

import { StatusCodes } from "http-status-codes";
import { BadRequestError,  NotFoundError, UnauthenticatedError } from "../../errors/index.js";
import bcrypt from 'bcryptjs';

// @desc: ADMIN SIGNNUP
export const signUp = async (req, res) => {
  const { adminID, name, password } = req.body;

  if (!adminID || !name || !password) {
    throw new BadRequestError('Wrong admin ID, name or password');
  }

  const admin = await Admin.create({
    adminID,
    name,
    password
  });

  return res.status(StatusCodes.CREATED).json({ admin });
};

// @desc: ADMIN LOGIN
export const login = async (req, res) => {
  const { adminID, password } = req.body;

  const admin = await Admin.findOne({ adminID });

  if (admin) {
    const adminLogin = await bcrypt.compare(password, admin.password);
    if (adminLogin) {
      // return admin;
      return res.status(StatusCodes.OK).json({ admin });

    } else {
      throw new NotFoundError('Password Incorrect')
    }
  } else if (!admin) {
    throw new UnauthenticatedError(`${adminID} does not exist`);
  }
}

// @desc: GET ALL APPLICATIONS
export const getAllApplications = async (req, res) => {
  const applications = await Promise.all([
    ApplicationRequest.find({}).populate('alocatedHouse').populate({path: 'staff', select: 'name department dateOfEmployment position staffID'}),

    MaintenanceRequest.find({}).populate('houseSpecified').populate({ path: 'staff', select: 'name department dateOfEmployment position staffID'}),

    RetirementRequest.find({}).populate('houseSpecified').populate({ path: 'staff', select: 'name department dateOfEmployment position staffID'})
  ]);

  if (applications.length === 0) {
    throw new NotFoundError('Sorry no applications found at the moment');
  }

  return res.status(StatusCodes.OK).json({ applications });
};

// @desc: GET SINGLE APPLICATIONS
export const getSingleApplication = async (req, res) => {
  const { id } = req.params;

  const application = await Promise.all([
    ApplicationRequest.find({ _id: id }).populate('alocatedHouse').populate({path: 'staff', select: 'name department dateOfEmployment position staffID'}),

    MaintenanceRequest.find({ _id: id }).populate('houseSpecified').populate({ path: 'staff', select: 'name department dateOfEmployment position staffID'}),

    RetirementRequest.find({ _id: id }).populate('houseSpecified').populate({ path: 'staff', select: 'name department dateOfEmployment position staffID'})
  ]);

  if (!application) {
    throw new NotFoundError('The requested resource is not available');
  }

  return res.status(StatusCodes.OK).json({ application });
};

// @desc: GET ALL APPLICATION REQUEST 
export const getAllApplicationRequests = async (req, res) => {
  const application = await ApplicationRequest.find({}).populate('houseSpecified').populate({ path: 'staff', select: 'name department dateOfEmployment position staffID'});

  if (application.length === 0) {
    throw new NotFoundError('No application requests at the moment');
  }

  return res.status(StatusCodes.OK).json({ application });
};


// @desc: GET ALL MAINTENANCE REQUEST 
export const getAllMaintenanceRequests = async (req, res) => {
  const maintenance = await MaintenanceRequest.find({}).populate('houseSpecified').populate({ path: 'staff', select: 'name department dateOfEmployment position staffID'});

  if (maintenance.length === 0) {
    throw new NotFoundError('No maintenance requests at the moment');
  }

  return res.status(StatusCodes.OK).json({ maintenance });
};

// @desc: GET ALL RETIREMENT REQUEST
export const getAllRetirementRequests = async (req, res) => {
  const retirement = await RetirementRequest.find({}).populate('houseSpecified').populate({ path: 'staff', select: 'name department dateOfEmployment position staffID'});

  if (retirement.length === 0) {
    throw new NotFoundError('No retirement requests at the moment');
  }

  return res.status(StatusCodes.OK).json({ retirement });
};

// @desc: GET SINGLE APPLICATION REQUEST
export const getSingleApplicationRequest = async (req, res) => {
  const { id } = req.params;

  const application = await ApplicationRequest.find({ _id: id }).populate('houseSpecified').populate({ path: 'staff', select: 'name department dateOfEmployment position staffID'});

  if (!application) {
    throw new NotFoundError('Application is not available');
  }

  return res.status(StatusCodes.OK).json({ application }); 
};

// @desc: GET SINGLE MAINTENANCE REQUEST
export const getSingleMaintenanceRequest = async (req, res) => {
  const { id } = req.params;

  const maintenance = await MaintenanceRequest.find({ _id: id }).populate('houseSpecified').populate({ path: 'staff', select: 'name department dateOfEmployment position staffID'});

  if (!maintenance) {
    throw new NotFoundError('maintenance is not available');
  }

  return res.status(StatusCodes.OK).json({ maintenance });
};

// @desc: GET SINGLE RETIREMENT REQUEST
export const getSingleRetirementRequest = async (req, res) => {
  const { id } = req.params;

  const retirement = await RetirementRequest.find({ _id: id }).populate('houseSpecified').populate({ path: 'staff', select: 'name department dateOfEmployment position staffID'});

  if (!retirement) {
    throw new NotFoundError('retirement is not available');
  }

  return res.status(StatusCodes.OK).json({ retirement });
};
