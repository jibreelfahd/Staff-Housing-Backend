import { StatusCodes } from "http-status-codes";

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong, Please Try Again Later",
    statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  // STAFF VALIDATION ERROR
  if (err.message.includes("Staff validation failed")) {
    let error = {
      name: "",
      email: "",
      position: "",
      department: "",
      password: "",
      dateOfEmployment: "",
    };

    Object.values(err.errors).forEach(({ properties }) => {
      customError.message = error[properties.path] = properties.message;
    });
    customError.statusCodes = StatusCodes.BAD_REQUEST;
  }

  // APPLICATION VALIDATION ERROR
  if (err.message.includes("Applications validation failed")) {
    let error = {
      staffID: "",
      area: "",
      name: "",
      department: "",
    };

    Object.values(err.errors).forEach(({ properties }) => {
      customError.message = error[properties.path] = properties.message;
    });
    customError.statusCodes = StatusCodes.BAD_REQUEST;
  }

  //HANDLING DUPLICATE KEY
  if (err.code === 11000) {
    customError.message = "Duplicate key, this user is already registered";
    customError.statusCodes = StatusCodes.BAD_REQUEST;
  }

  //HANDLING CAST ERROR
  if (err.message === "CastError") {
    customError.message = `No item with id: ${err.value} found`;
    customError.statusCodes = StatusCodes.NOT_FOUND;
  }

  console.log("error from middleware", err);
  return res
    .status(customError.statusCodes)
    .json({ message: customError.message });
};

export default errorHandlerMiddleware;
